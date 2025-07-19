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

export const revalidate = 60;

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
            {/* Sticky Header with max-w container inside */}
            <header className="sticky top-0 z-50 bg-background border-b">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <Navbar navLinks={navLinks} />
              </div>
            </header>

            {/* Main Content Area - expand and take up all vertical space between the header and footer. */}
            <main className="flex-grow">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col">
                <BreadcrumbNav />
                {children}
                <BreadcrumbNav />
              </div>
            </main>

            {/* Footer with same max-w wrapper */}
            <footer className="border-t">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                <Footer />
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
