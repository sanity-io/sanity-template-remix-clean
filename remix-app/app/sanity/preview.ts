import { createCookieSessionStorage } from "@remix-run/node";
import type { FilteredResponseQueryOptions } from "@sanity/client";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    name: "__sanity_preview",
    path: "/",
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax",
    secrets: [process.env.SESSION_SECRET || ""],
    secure: process.env.NODE_ENV !== "development",
  },
});

async function previewContext(
  headers: Headers
): Promise<{ preview: boolean; options: FilteredResponseQueryOptions }> {
  const previewSession = await getSession(headers.get("Cookie"));

  const preview = 
  previewSession.get("projectId") === process.env.PUBLIC_SANITY_PROJECT_ID;

  return {
    preview,
    options: preview
      ? {
          perspective: "drafts",
          stega: true,
          token: process.env.SANITY_VIEWER_TOKEN,
          useCdn: false,
        }
      : {
          perspective: "published",
          stega: true,
        },
  };
}

export { commitSession, destroySession, getSession, previewContext };