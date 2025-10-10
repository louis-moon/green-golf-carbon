// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientOnlyNavbar from "@/components/ClientOnlyNavbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Green Golf Carbon",
  description: "Sustainable golf — carbon-neutral platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Reserve space for the fixed header (80px) + iOS safe area. Use ONLY one padding rule */}
      <body className="[padding-top:calc(env(safe-area-inset-top)+80px)]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientOnlyNavbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
