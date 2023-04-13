import { createClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

declare global {
  interface Window {
    ENV: {
      SANITY_PROJECT_ID: string;
      SANITY_DATASET: string;
    };
  }
}

const { SANITY_PROJECT_ID, SANITY_DATASET } =
  typeof document === "undefined" ? process.env : window.ENV;

if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
  throw new Error("Did you forget to run sanity init --env?");
}

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-03-20", // date of setup
});

export async function getPosts(): Promise<Post[]> {
  return await client.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}
