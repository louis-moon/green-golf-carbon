import os, json, re, hashlib, datetime as dt, html
from pathlib import Path
import requests, feedparser

# ---- config & constants ----
ROOT = Path(__file__).parent
CFG = json.loads((ROOT / "config.json").read_text())
STATES = set(CFG["states"])
KEYWORDS = [k.lower() for k in CFG["keywords"]]
RSS_FEEDS = CFG["rss_feeds"]
SLACK_WEBHOOK = os.getenv("SLACK_WEBHOOK_URL")

# GDELT / OpenAlex / NWS endpoints
GDELT_DOC = "https://api.gdeltproject.org/api/v2/doc/doc"        # mode=ArtList&format=json
OPENALEX = "https://api.openalex.org/works"
NWS_ALERTS = "https://api.weather.gov/alerts/active"

# storage
DATA_DIR = ROOT / "data"
DATA_DIR.mkdir(exist_ok=True)
SEEN_FP = DATA_DIR / "seen.json"
SEEN = set(json.loads(SEEN_FP.read_text()) if SEEN_FP.exists() else [])

# ---- utils ----
def build_teams_payload(items, page_url=None):
    # Minimal payload that Teams accepts; supports basic Markdown
    # Docs show {"text": "..."} works for webhooks.  :contentReference[oaicite:3]{index=3}
    lines = ["**Green Golf Carbon — Daily Digest**"]
    top3 = [x for x in items if x["impact"] >= 3][:3]
    if top3:
        lines += ["", "**Top 3 (High Impact)**"]
        for it in top3:
            why = "; ".join(it["why"])
            lines.append(f"- [{it['title']}]({it['url']}) — _{it['source']} • {it['published']}_")
            lines.append(f"  {why}")
    others = [x for x in items if x not in top3][:7]
    if others:
        lines += ["", "**More to scan**"]
        for it in others:
            lines.append(f"- [{it['title']}]({it['url']}) — _{it['source']}_")
    if page_url:
        lines += ["", f"[Full digest]({page_url}) — informational only."]
    return {"text": "\n".join(lines)}

def post_teams(payload):
    url = os.getenv("TEAMS_WEBHOOK_URL")
    if not url:
        print("No TEAMS_WEBHOOK_URL set; skipping Teams post.")
        return
    r = requests.post(url, json=payload, timeout=30)
    r.raise_for_status()

def norm(s): return re.sub(r"\s+", " ", (s or "").strip())

def make_id(title, url):
    base = (title or "") + "|" + (url or "")
    return hashlib.sha256(base.encode()).hexdigest()[:16]

def has_kw(text):
    t = (text or "").lower()
    return any(k in t for k in KEYWORDS)

def why_it_matters(text):
    t = (text or "").lower()
    bullets=[]
    if any(x in t for x in ["drought", "heat", "excessive heat", "red flag", "air quality"]):
        bullets.append("Operational risk (heat/drought/air quality) for U.S. courses.")
    if any(x in t for x in ["irrigation", "water restriction", "water conservation"]):
        bullets.append("Potential impact on irrigation schedules and water budgets.")
    if any(x in t for x in ["enhanced rock weathering","erw","basalt","olivine"]):
        bullets.append("Relevance to ERW implementation and material supply.")
    if any(x in t for x in ["mrv","carbon credit","isometric","puro.earth"]):
        bullets.append("Implications for MRV/crediting and partner standards.")
    if any(x in t for x in ["usga","gcsaa","superintendent"]):
        bullets.append("Golf-industry guidance or partnership opportunity.")
    return bullets[:3] or ["General industry signal worth a quick scan."]

def impact_score(text):
    t = (text or "").lower()
    score = 0
    score += 2 if any(x in t for x in ["enhanced rock weathering","erw","basalt","olivine"]) else 0
    score += 2 if any(x in t for x in ["mrv","carbon credit","isometric","puro.earth"]) else 0
    score += 1 if any(x in t for x in ["usga","gcsaa","turfgrass"]) else 0
    score += 1 if any(x in t for x in ["drought","excessive heat","irrigation","water restriction"]) else 0
    return min(5, score)

def jaccard(a,b):
    A=set(re.findall(r"\w+", (a or "").lower())); B=set(re.findall(r"\w+", (b or "").lower()))
    return len(A&B)/max(1,len(A|B))

def post_slack(blocks):
    if not SLACK_WEBHOOK:
        print("No SLACK_WEBHOOK_URL set; skipping Slack.")
        return
    payload = {"blocks": blocks}
    r = requests.post(SLACK_WEBHOOK, json=payload, timeout=30)
    r.raise_for_status()

def html_page(items):
    now = dt.datetime.now(dt.timezone.utc).astimezone()
    head = f"""<!doctype html><meta charset="utf-8">
<title>Green Golf Carbon Daily Digest</title>
<style>
body{{font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin:24px;}}
h1{{margin:0 0 8px}} .item{{border:1px solid #ddd;border-radius:12px;padding:12px;margin:12px 0}}
small{{color:#666}} ul{{margin:6px 0 0 20px}}
</style>
<h1>Green Golf Carbon — Daily Digest</h1>
<small>Updated {now.strftime('%Y-%m-%d %H:%M %Z')}</small>
"""
    body=[]
    for it in items:
        why = "".join(f"<li>{html.escape(b)}</li>" for b in it["why"] )
        body.append(f"""
<div class="item">
  <a href="{html.escape(it['url'])}"><b>{html.escape(it['title'])}</b></a><br/>
  <small>{html.escape(it['source'])} • {html.escape(it['published'])}</small>
  <ul>{why}</ul>
</div>""")
    return head + "\n".join(body)

# ---- fetchers (free) ----
def fetch_rss():
    items=[]
    for url in RSS_FEEDS:
        feed = feedparser.parse(url)
        for e in feed.entries[:30]:
            title = norm(e.get("title",""))
            link = e.get("link","")
            if not title or not link: continue
            if not (has_kw(title) or has_kw(e.get("summary",""))): 
                # keep broad; RSS is curated by you already
                pass
            items.append({
                "source": feed.feed.get("title","RSS"),
                "title": title,
                "url": link,
                "published": e.get("published",""),
                "text": title + " " + e.get("summary","")
            })
    return items

def fetch_gdelt():
    # Use DOC API (free). Example params: query, mode=ArtList, format=json
    items=[]
    # Focus queries to reduce noise
    queries = [
        "golf course AND drought",
        "golf AND irrigation restriction",
        "enhanced rock weathering OR basalt OR olivine AND golf",
        "turfgrass AND water",
        "USGA OR GCSAA AND sustainability"
    ]
    for q in queries:
        p={"query": q, "mode":"ArtList", "format":"json"}
        r = requests.get(GDELT_DOC, params=p, timeout=30)
        if r.status_code!=200: continue
        arts = r.json().get("articles", [])
        for a in arts[:40]:
            title = norm(a.get("title",""))
            url = a.get("url","")
            if not title or not url: continue
            items.append({
                "source": a.get("sourceCommonName","GDELT"),
                "title": title,
                "url": url,
                "published": a.get("seendate",""),
                "text": title
            })
    return items

def fetch_openalex():
    # last 30 days of ERW/turfgrass science
    since = (dt.date.today()-dt.timedelta(days=30)).isoformat()
    p = {
        "search": "enhanced rock weathering OR basalt dust OR turfgrass soil carbon",
        "from_publication_date": since,
        "sort": "publication_date:desc"
    }
    r = requests.get(OPENALEX, params=p, timeout=30)
    if r.status_code!=200: return []
    out=[]
    for w in r.json().get("results", [])[:40]:
        title = norm(w.get("display_name",""))
        url = w.get("id","")
        out.append({
            "source":"OpenAlex",
            "title": title,
            "url": url,
            "published": w.get("publication_date",""),
            "text": title + " " + " ".join(w.get("title",'') for _ in [0]) # keep simple
        })
    return out

def fetch_nws():
    # national active alerts; filter by areas that mention our states
    r = requests.get(NWS_ALERTS, timeout=30, headers={"User-Agent":"greengolf-digest"})
    if r.status_code!=200: return []
    items=[]
    for f in r.json().get("features", []):
        props = f.get("properties",{})
        area = props.get("areaDesc","")
        if not any(s in area for s in STATES): 
            continue
        title = props.get("headline") or props.get("event") or ""
        url = f.get("id","")
        items.append({
            "source": "NWS Alerts",
            "title": norm(title),
            "url": url,
            "published": props.get("effective",""),
            "text": (title + " " + props.get("description",""))[:2000]
        })
    return items

# ---- pipeline ----
def dedupe(items):
    # by id on title+url + near-duplicate by jaccard
    unique=[]
    seen_titles=[]
    for it in sorted(items, key=lambda x: x.get("published",""), reverse=True):
        if any(jaccard(it["title"], t) >= 0.75 for t in seen_titles): 
            continue
        seen_titles.append(it["title"])
        unique.append(it)
    return unique

def screen(items):
    out=[]
    for it in items:
        text = (it["title"] + " " + it.get("text","")).lower()
        if any(k in text for k in KEYWORDS) or it["source"] in ("NWS Alerts","OpenAlex"):
            out.append(it)
    return out

def format_items(items):
    out=[]
    for it in items:
        iid = make_id(it["title"], it["url"])
        if iid in SEEN: 
            continue
        SEEN.add(iid)
        out.append({
            "id": iid,
            "source": it["source"],
            "title": it["title"],
            "url": it["url"],
            "published": it["published"][:19],
            "why": why_it_matters(it["title"] + " " + it.get("text","")),
            "impact": impact_score(it["title"] + " " + it.get("text",""))
        })
    return out

def build_slack_blocks(top):
    if not top: 
        return [{"type":"section","text":{"type":"mrkdwn","text":"No new high-signal items."}}]
    blocks=[{"type":"header","text":{"type":"plain_text","text":"Green Golf Carbon — Daily Digest"}}]
    # Top 3 high impact
    top3 = [x for x in top if x["impact"]>=3][:3]
    if top3:
        blocks.append({"type":"section","text":{"type":"mrkdwn","text":"*Top 3 (High Impact)*"}})
        for it in top3:
            wm = " • ".join(it["why"])
            blocks.append({"type":"section","text":{"type":"mrkdwn","text":f"*<{it['url']}|{it['title']}>*\n{wm}\n_{it['source']} • {it['published']}_"}})
            blocks.append({"type":"divider"})
    # The rest
    others = [x for x in top if x not in top3][:7]
    if others:
        blocks.append({"type":"section","text":{"type":"mrkdwn","text":"*More to scan*"}})
        for it in others:
            blocks.append({"type":"section","text":{"type":"mrkdwn","text":f"• <{it['url']}|{it['title']}> — _{it['source']}_"}})
    blocks.append({"type":"context","elements":[{"type":"mrkdwn","text":"Informational only — not investment advice."}]})
    return blocks

def main():
    pool = []
    pool += fetch_rss()
    pool += fetch_gdelt()
    pool += fetch_openalex()
    pool += fetch_nws()

    pool = dedupe(pool)
    pool = screen(pool)
    items = format_items(pool)
    # sort by impact then recency
    items = sorted(items, key=lambda x: (x["impact"], x["published"]), reverse=True)[:15]

    # Save SEEN
    SEEN_FP.write_text(json.dumps(sorted(list(SEEN))))
    # Write HTML (for GitHub Pages)
    docs = ROOT / "docs"
    docs.mkdir(exist_ok=True)
    
    (docs / "index.html").write_text(html_page(items), encoding="utf-8")
    (docs / ".nojekyll").write_text("")

    # Teams
    page_url = os.getenv("DIGEST_URL")  # optional
    post_teams(build_teams_payload(items, page_url))

if __name__ == "__main__":
    main()
