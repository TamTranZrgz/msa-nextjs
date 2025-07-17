// lib/hooks/use-scrollbar-stability.ts
import { useEffect } from "react";

/**
 * Prevents layout shift when scrollbars are hidden, e.g. in modals or drawers.
 * Adds padding-right to the body to compensate for missing scrollbar width.
 */
export function useScrollbarStability(open: boolean) {
  useEffect(() => {
    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.paddingRight = "";
    }
  }, [open]);
}
