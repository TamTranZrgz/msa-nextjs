"use client";
import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const className =
    "mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex flex-col" +
    (pathname === "/" ? " pt-6 md:pt-10 lg:pt-12" : "");

  return <div className={className}>{children}</div>;
}
