import { formatDate } from "~/utils";
import { urlFor } from "~/utils/image";
import { type Post } from "~/utils/sanity";

export default function Card({ post }: { post: Post }) {
  return (
    <div className="card">
      {post.mainImage ? (
        <img
          className="card__cover"
          src={urlFor(post.mainImage).width(500).height(300).url()}
          alt="Cover"
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="card__container">
        <h3 className="card__title">
          <a
            className="card__link"
            href={`/post/${post.slug.current}`}
          >
            {post.title}
          </a>
        </h3>
        <p className="card__excerpt">{post.excerpt}</p>
        <p className="card__date">{formatDate(post._createdAt)}</p>
      </div>
    </div>
  );
}
