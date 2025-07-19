import ContentSection from "@/components/ContentSection";
import HeroSection from "@/components/HeroSection";
import PromoSection from "@/components/PromoSection";
import { serverClient } from "@/lib/sanity";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MSA - Home",
  description: "Mental Soul Aid",
};

export const revalidate = 60;

async function getData() {
  const query = `
  *[_type == "homePage"][0] {
    title,
    heroImage {
      heading,
      subHeading,
      image,
      cta {
        label,
        internalLink->{
          slug
        }
      }
    },
    primaryInfoLink {
      linkImage {
        alt,
        asset
      },
      internalLink->{
        _id,
        _type,
        title,
        slug
      }
    },
    secondaryInfoLink {
      linkImage {
        alt,
        asset
      },
      internalLink->{
        _id,
        _type,
        title,
        slug
      }
    },
    tertiaryInfoLink {
      linkImage {
        alt,
        asset
      },
      internalLink->{
        _id,
        _type,
        title,
        slug
      }
    },
    mainContent[] {
      ...,
      _type == "cta" => {
        ...,
        internalLink->{
          _id,
          slug
        }
      }
    }
  }
  `;

  const data = await serverClient.fetch(query);
  return data;
}

export default async function Home() {
  const data = await getData();
  //   console.log(data);

  if (!data) {
    return <div>Loading...</div>;
  }

  const hero = data?.heroImage;

  return (
    <>
      {hero && (
        <HeroSection
          image={hero.image}
          heading={hero.heading}
          subHeading={hero.subHeading}
          cta={hero.cta}
        />
      )}

      <PromoSection
        items={[
          data.primaryInfoLink,
          data.secondaryInfoLink,
          data.tertiaryInfoLink,
        ]}
      />

      <div className="max-w-full mx-auto py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Giới Thiệu MSA (Mental Soul Aid)
        </h1>
        <ContentSection value={data.mainContent} />
      </div>
    </>
  );
}
