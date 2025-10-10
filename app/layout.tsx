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
      {/* Reserve space for fixed header (h-20 = 80px) + iOS safe area */}
      <body className="pt-20 md:pt-20 [padding-top:calc(env(safe-area-inset-top)+80px)]">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientOnlyNavbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
