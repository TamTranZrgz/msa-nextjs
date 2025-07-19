import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

type InfoLink = {
  linkImage: {
    alt: string;
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  internalLink: {
    _id: string;
    _type: "infoPage";
    slug: {
      _type: "slug";
      current: string;
    };
    title: string;
  };
};

type PromoSectionProps = {
  items: InfoLink[];
};

export default function PromoSection({ items }: PromoSectionProps) {
  return (
    // <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    //   {items.map((item, i) => {
    //     const imageUrl = urlFor(item.linkImage.asset)
    //       .width(256)
    //       .height(256)
    //       .url();
    //     const slug = item.internalLink?.slug?.current;

    //     return (
    //       slug && (
    //         <Link
    //           key={i}
    //           href={`/${slug}`}
    //           className="flex flex-col items-center group focus:outline-none"
    //         >
    //           <div className="w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-primary shadow-md mb-4 transition-transform duration-300 group-hover:scale-105">
    //             <Image
    //               src={imageUrl}
    //               alt={item.linkImage.alt}
    //               width={256}
    //               height={256}
    //               className="object-cover w-full h-full"
    //             />
    //           </div>
    //           <span className="text-primary group-hover:underline font-medium text-xl md:text-2xl">
    //             {item.internalLink.title}
    //           </span>
    //         </Link>
    //       )
    //     );
    //   })}
    // </section>
    <section className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      {items.map((item, i) => {
        const slug = item.internalLink?.slug?.current;

        return (
          slug && (
            <Link
              key={i}
              href={`/${slug}`}
              className="flex flex-col items-center group focus:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-opacity-60 rounded"
              tabIndex={0}
            >
              <div className="relative w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-primary shadow-md mb-4 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={urlFor(item.linkImage.asset).url()}
                  alt={item.linkImage.alt}
                  fill
                  sizes="(max-width: 768px) 160px, (max-width: 1024px) 208px, 240px"
                  className="object-cover rounded-full"
                  priority={false}
                />
              </div>
              <span className="text-primary group-hover:underline font-medium text-xl md:text-2xl">
                {item.internalLink.title}
              </span>
            </Link>
          )
        );
      })}
    </section>
  );
}
