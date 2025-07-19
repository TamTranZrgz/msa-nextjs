"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { MobileDrawer } from "./MobileDrawer";
import { DesktopMenu } from "./DesktopMenu";
import { NavItem } from "@/shared/shared-types";

export default function Navbar({ navLinks }: { navLinks: NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="flex items-center justify-between h-16">
        {/* Left: Logo */}
        <div className="text-xl font-semibold text-primary">
          <Link href="/">LOGO</Link>
        </div>

        {/* Center: Desktop Menu */}
        <DesktopMenu links={navLinks} />

        {/* Right: Search + Mobile Drawer Trigger */}
        <div className="flex items-center space-x-4 lg:space-x-0">
          <button
            className="text-muted-foreground hover:text-foreground"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <MobileDrawer links={navLinks} />
        </div>
      </nav>
    </div>
  );
}
