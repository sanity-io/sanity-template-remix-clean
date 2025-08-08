import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { client } from "~/sanity/client";
import { commitSession, getSession } from "~/sanity/preview";
import { projectId } from "~/sanity/projectDetails";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  if (!process.env.SANITY_VIEWER_TOKEN) {
    throw new Response("Preview mode missing token", { status: 401 });
  }

  const clientWithToken = client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  });

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    throw new Response("Invalid secret", { status: 401 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("projectId", projectId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};