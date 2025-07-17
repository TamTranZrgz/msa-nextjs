import NavItem from "@/shared/shared-types";
import { HoverablePopover } from "./HoverablePopover";

export function DesktopMenu({ links }: { links: NavItem[] }) {
  return (
    <nav className="hidden lg:flex items-center space-x-6 text-sm">
      {links?.map((link) =>
        link.children && link.children.length > 0 ? (
          <HoverablePopover
            key={link._id}
            label={link.title}
            href={`/${link.fullSlug}`}
          >
            {link.children.map((child) => (
              <a
                key={child._id}
                href={`/${child.fullSlug}`}
                className="block px-2 py-1 hover:bg-accent rounded"
              >
                {child.title}
              </a>
            ))}
          </HoverablePopover>
        ) : (
          <a
            key={link._id}
            href={`/${link.fullSlug}`}
            className="hover:underline"
          >
            {link.title}
          </a>
        )
      )}
    </nav>
  );
}
