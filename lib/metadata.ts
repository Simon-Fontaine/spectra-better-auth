import type { Metadata } from "next/types";

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: "https://owspectra.com",
      images: "https://owspectra.com/images/og.png",
      siteName: "Better Auth",
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: "@beakcru",
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "https://owspectra.com/images/og.png",
      ...override.twitter,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(`https://${process.env.VERCEL_URL!}`);