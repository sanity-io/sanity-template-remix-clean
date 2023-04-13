import { useLoaderData, type V2_MetaFunction } from "@remix-run/react";
import Card from "~/components/Card";
import Welcome from "~/components/Welcome";
import { getPosts } from "~/utils/sanity";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async () => {
  const posts = await getPosts();
  return posts;
};

export default function Index() {
  const posts = useLoaderData<typeof loader>();

  return (
    <section>
      {posts.length ? (
        posts.map((post) => (
          <Card
            key={post.title}
            post={post}
          />
        ))
      ) : (
        <Welcome />
      )}
    </section>
  );
}
