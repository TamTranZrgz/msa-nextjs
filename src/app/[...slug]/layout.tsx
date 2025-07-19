import { getBreadcrumbInfo } from "@/lib/queries";
import { buildBreadcrumbChain } from "@/lib/utils"; // assuming your helper is here
import BreadcrumbNav from "@/components/BreadcrumbNav";

type InfoPageLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    slug: string[];
  }>;
};

export default async function InfoPageLayout({
  children,
  params,
}: InfoPageLayoutProps) {
  const { slug: slugArray } = await params;
  // console.log("slugArray:", slugArray);

  const breadcrumbData = await getBreadcrumbInfo(
    slugArray[slugArray.length - 1]
  );

  // console.log("breadcrumbData:", breadcrumbData);

  const breadcrumbItems = breadcrumbData
    ? buildBreadcrumbChain(breadcrumbData)
    : [];

  return (
    <>
      <BreadcrumbNav items={breadcrumbItems} />
      {children}
      <BreadcrumbNav items={breadcrumbItems} />
    </>
  );
}
