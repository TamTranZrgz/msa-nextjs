import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

type BreadcrumbNavProps = {
  items: { title: string; href: string }[];
};

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  //   console.log("items:", items);
  return (
    <div className="py-2 sm:py-3 md:py-4 lg:py-6 ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="/"
                className="text-base sm:text-lg md:text-xl lg:text-2xl"
              >
                Trang chủ
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {idx === items.length - 1 ? (
                  <BreadcrumbPage className="text-base sm:text-lg md:text-xl lg:text-2xl">
                    {item.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={item.href}
                      className="text-base sm:text-lg md:text-xl lg:text-2xl"
                    >
                      {item.title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
