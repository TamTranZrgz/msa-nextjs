import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNavbarLinks } from "@/lib/queries";
import BreadcrumbNav from "@/components/BreadcrumbNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MSA - Mental Soul Aid",
  description: "Mental Soul Aid",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = await getNavbarLinks();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ scrollbarGutter: "stable" }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 bg-background border-b">
              <Navbar navLinks={navLinks} />
            </header>
            <div className="pt-16 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex-grow flex flex-col">
              <BreadcrumbNav />
              <main className="flex-grow">{children}</main>
              <BreadcrumbNav />
            </div>
            <footer>
              <Footer />
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
