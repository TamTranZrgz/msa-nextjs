import { components } from "@/components/ContentSection";
import { getInfoPageBySlug } from "@/lib/queries";
import { serverClient } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

type InfoPageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug: slugArray } = await params;
  const fullSlug = slugArray?.join("/") || "";

  // Step 1: Try to find an infoPage
  let page = await getInfoPageBySlug(fullSlug);

  // console.log("Page:", page);

  // Step 2: Fallback to aboutUsPage or DisclaimerPage for top-level slugs
  if (!page && slugArray?.length === 1) {
    page = await serverClient.fetch(
      `*[
        (_type == "aboutUsPage" || _type == "disclaimerPage") 
        && slug.current == $slug
      ][0]{
        _id,
        _type,
        pageTitle,
        content
      }`,
      { slug: fullSlug }
    );
  }

  if (!page) return notFound();

  return (
    <article className="mx-auto py-8">
      <PortableText value={page.content} components={components} />
    </article>
  );
}
