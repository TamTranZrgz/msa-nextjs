"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, X } from "lucide-react";
import { useScrollbarStability } from "@/lib/hooks/use-scrollbar-stability";
import NavItem from "@/shared/shared-types";
import Link from "next/link";

export function MobileDrawer({ links }: { links: NavItem[] }) {
  const [open, setOpen] = useState(false);
  useScrollbarStability(open);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <button
          aria-label="Open menu"
          className="lg:hidden text-muted-foreground hover:cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="p-4">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle className="text-lg">Menu</DrawerTitle>
          <DrawerClose asChild>
            <button aria-label="Close menu">
              <X className="w-5 h-5 hover:cursor-pointer" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        <nav className="mt-4 space-y-2">
          <Accordion type="single" collapsible>
            {links.map((link) =>
              link.children && link.children.length > 0 ? (
                <AccordionItem key={link._id} value={link._id}>
                  <AccordionTrigger className="justify-between">
                    <Link
                      href={`/${link.fullSlug}`}
                      className="hover:underline flex-1 text-left"
                    >
                      {link.title}
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent>
                    {link.children.map((child) => (
                      <a
                        key={child._id}
                        href={`/${child.fullSlug}`}
                        className="block text-sm py-1 pl-4"
                      >
                        {child.title}
                      </a>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <a
                  key={link._id}
                  href={`/${link.fullSlug}`}
                  className="block text-sm py-1"
                >
                  {link.title}
                </a>
              )
            )}
          </Accordion>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
