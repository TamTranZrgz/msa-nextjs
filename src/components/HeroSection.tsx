import { urlFor } from "@/lib/sanity";
import { SanityImage } from "@/shared/shared-types";
import Link from "next/link";

type HeroSectionProps = {
  image: SanityImage;
  heading?: string;
  subHeading?: string;
  cta?: {
    label: string;
    internalLink?: {
      slug?: {
        current: string;
      };
    };
  };
};

export default function HeroSection({
  image,
  heading,
  subHeading,
  cta,
}: HeroSectionProps) {
  const imageUrl = image ? urlFor(image).url() : "";
  const slug = cta?.internalLink?.slug?.current;

  return (
    <section
      className="relative w-full h-[500px] flex items-center justify-center text-white bg-cover bg-center rounded-xl overflow-hidden"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Full-size dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0 rounded-xl" />

      {/* Text content wrapper */}
      <div className="relative z-10 rounded-lg px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-12 max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-5xl text-center">
        {heading && (
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {heading}
          </h1>
        )}
        {subHeading && (
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6">
            {subHeading}
          </p>
        )}
        {cta?.label && slug && (
          <Link
            href={`/${slug}`}
            className="inline-block bg-primary text-white text-sm sm:text-base md:text-lg py-2 px-4 rounded-3xl hover:bg-primary/80 transition"
          >
            {cta.label} &#8594;
          </Link>
        )}
      </div>
    </section>
  );
}
