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
      {/* Reserve space for the fixed header (80px) + iOS safe area */}
      <body className="[padding-top:calc(env(safe-area-inset-top)+80px)] min-h-screen bg-background text-foreground antialiased">
        {/* Lock to light theme so mobile = desktop */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ClientOnlyNavbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
