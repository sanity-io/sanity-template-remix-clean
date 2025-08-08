import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sanity/preview";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};