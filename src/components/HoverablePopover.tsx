import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type HoverablePopoverProps = {
  label: string;
  href: string;
  children: React.ReactNode;
};

export function HoverablePopover({
  label,
  href,
  children,
}: HoverablePopoverProps) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150); // delay close
  };

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex items-center space-x-1 cursor-pointer select-none">
          <Link href={href} className="hover:underline">
            {label}
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleOpen();
            }}
            aria-label="Toggle submenu"
            className="text-muted-foreground transition-transform duration-300"
          >
            <ChevronDown
              className={`w-4 h-4 ${
                open ? "rotate-180" : "rotate-0"
              } transition-transform duration-300 hover:cursor-pointer`}
            />
          </button>
        </div>
      </PopoverTrigger>

      <PopoverContent
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="mt-2 p-2 border rounded-lg shadow-md bg-background"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}
