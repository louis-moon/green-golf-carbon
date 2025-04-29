"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

type Subscriber = {
  id: number
  email: string
  created_at: string
}

export default function SubscribeSection() {
  const [email, setEmail] = useState("")
  const [subs, setSubs] = useState<Subscriber[]>([])

  useEffect(() => {
    // fetch initial list
    supabase
      .from<Subscriber>("subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => data && setSubs(data))

    // realtime subscription
    const sub = supabase
      .channel("public:subscribers")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "subscribers" },
        (payload) => setSubs((prev) => [payload.new as Subscriber, ...prev])
      )
      .subscribe()

    return () => void supabase.removeChannel(sub)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    await supabase.from("subscribers").insert({ email })
    setEmail("")
  }

  return (
    <section id="subscribe" className="w-full py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Mailing List</h2>
        <form onSubmit={handleSubmit} className="mb-8 inline-flex">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 border rounded-l-md"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-r-md"
          >
            Sign Up
          </button>
        </form>
        <ul className="space-y-1 max-w-md mx-auto text-left">
          {subs.map((s) => (
            <li key={s.id} className="text-gray-700">
              {s.email}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
