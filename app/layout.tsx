// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientOnlyNavbar from "@/components/ClientOnlyNavbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Green Golf Carbon | Improving Soil Quality & Capturing CO2",
  description:
    "Green Golf Carbon transforms golf courses and managed turf into carbon sinks through innovative basalt-enhanced sand technology.",
  icons: {
    icon: "/ggc_logo.jpg",        // or better: a 32x32/48x48 PNG
    shortcut: "/ggc_logo.jpg",
    apple: "/ggc_logo.jpg",       // ideally 180x180 PNG for iOS
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientOnlyNavbar />
          <div className="pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
