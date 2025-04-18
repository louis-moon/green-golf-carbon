import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Golf Carbon | Improving Soil Quality & Capturing CO2",
  description:
    "Green Golf Carbon transforms golf courses and managed turf into carbon sinks through innovative basalt-enhanced sand technology.",
  generator: "v0.dev",
};

// Dynamically import Navbar with ssr: false to disable server-side rendering for this component
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar /> {/* This will now be dynamically imported client-side */}
          <div className="pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
