import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";

type ContentSectionProps = {
  value: any[]; // Sanity Portable Text array
};

export const components: PortableTextComponents = {
  types: {
    // Handle custom CTA block
    cta: ({ value }) => {
      const slug = value.internalLink?.slug?.current;
      const label = value.label || "Learn more";

      if (!slug) return null;

      return (
        <div className="mt-6">
          <Link
            href={`/${slug}`}
            className="inline-flex items-center text-lg text-primary font-bold hover:underline"
          >
            {label}
            <span className="ml-1">→</span>
          </Link>
        </div>
      );
    },
    linkObject: ({ value }) => {
      const { label, internalLink, externalLink, openInNewTab } = value;
      // console.log("label:", label);
      // console.log("inetrnalLink:", internalLink);

      // Determine the final href (internal link first, fallback to external)
      const href = internalLink?.slug?.current
        ? `/${internalLink.fullSlug || internalLink.slug.current}`
        : externalLink;

      if (!href) return null; // Guard if no valid link

      const rel = openInNewTab ? "noopener noreferrer" : undefined;
      const target = openInNewTab ? "_blank" : undefined;

      // Use <Link> for internal routing if available
      const isInternal = href.startsWith("/");

      return isInternal ? (
        <Link
          href={href}
          className="text-primary underline hover:text-blue-800"
        >
          {label}
        </Link>
      ) : (
        <Link
          href={href}
          target={target}
          rel={rel}
          className="text-primary underline hover:text-blue-800"
        >
          {label}
        </Link>
      );
    },
    linkGroup: ({ value }) => {
      return (
        <div className="flex flex-wrap justify-center gap-4 bg-gray-50 rounded p-4 sm:p-6 md:p-8">
          {value.links?.map(
            ({
              _key,
              label,
              internalLink,
              externalLink,
              openInNewTab,
            }: any) => {
              const href = internalLink?.fullSlug
                ? `/${internalLink.fullSlug}`
                : externalLink;

              if (!href) return null;

              const isInternal = href.startsWith("/");
              const rel = openInNewTab ? "noopener noreferrer" : undefined;
              const target = openInNewTab ? "_blank" : undefined;

              const linkClasses = `
                bg-gray-200 
                px-10 py-6 
                text-lg sm:text-xl md:text-2xl 
                rounded-lg 
                font-semibold 
                text-blue-600 
                hover:text-blue-800 
                hover:underline 
                text-center
                justify-center 
                w-[250px] sm:w-[280px] md:w-[300px]
              `;

              return isInternal ? (
                <Link key={_key} href={href} className={linkClasses}>
                  {label}
                </Link>
              ) : (
                <a
                  key={_key}
                  href={href}
                  target={target}
                  rel={rel}
                  className={linkClasses}
                >
                  {label}
                </a>
              );
            }
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold mb-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold mb-5">{children}</h3> // increased mb-4 → mb-5
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-medium mb-4">{children}</h4> // increased mb-3 → mb-4
    ),
    h5: ({ children }) => (
      <h5 className="text-base md:text-lg font-medium mb-3">{children}</h5> // increased mb-2 → mb-3
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 dark:text-gray-400 my-6 max-w-prose mx-auto leading-relaxed">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base md:text-lg leading-relaxed text-gray-800 dark:text-gray-200">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-4">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-black dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary hover:underline dark:text-blue-400"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default function ContentSection({ value }: ContentSectionProps) {
  return (
    <div className="max-w-full mx-auto py-6">
      <PortableText value={value} components={components} />
    </div>
  );
}
