import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  imageWidth = 1360,
  imageHeight = 765,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | CVR Construction`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "CVR Construction",
      locale: "en_CA",
      type: openGraphType,
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
