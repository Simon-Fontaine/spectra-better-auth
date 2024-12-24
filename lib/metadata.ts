import { siteConfig } from "@/configs/site";
import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: siteConfig.url,
      images: siteConfig.og_imgage,
      siteName: siteConfig.name,
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@SpectraOW2",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: siteConfig.og_imgage,
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_URL!}`);
