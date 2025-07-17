import envConfig from "@/config";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Server-side client — includes token for authenticated requests
export const serverClient = createClient({
  projectId: envConfig.SANITY_PROJECT_ID,
  dataset: envConfig.SANITY_DATASET,
  apiVersion: "2025-07-10",
  token: envConfig.SANITY_TOKEN,
  useCdn: false,
});

// Client-side client — no token, read-only, cached CDN usage
export const clientClient = createClient({
  projectId: envConfig.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: envConfig.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-07-10",
  useCdn: true,
});

const builder = imageUrlBuilder(serverClient);

export function urlFor(source: any) {
  return builder.image(source);
}
