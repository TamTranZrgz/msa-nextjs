import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToVietnamese = (date: string) => {
  return new Date(date).toLocaleDateString("vi-VI", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const formatYearToVietnamese = (date: string): string => {
  return new Date(date).toLocaleDateString("vi-VI", {
    year: "numeric",
  });
};

// Build the path from the top-level parent to the child
type PageNode = {
  slug?: {
    current: string;
  };
  parent?: PageNode | null;
};

export function buildFullSlug(page: PageNode): string {
  const slugs: string[] = [];
  let current: PageNode | null | undefined = page;

  while (current?.slug?.current) {
    slugs.unshift(current.slug.current);
    current = current.parent;
  }

  return "/" + slugs.join("/");
}

// Get breadcrumb info retreive from Sanity
export function buildBreadcrumbChain(data: any) {
  const chain = [];

  if (data?.parent?.parent) {
    chain.push({
      title: data.parent.parent.title,
      href: `/${data.parent.parent.slug}`,
    });
  }

  if (data?.parent) {
    chain.push({
      title: data.parent.title,
      href: `/${data.parent.slug}`,
    });
  }

  chain.push({
    title: data.title,
    href: `/${data.slug}`,
  });

  return chain;
}
