import { Link } from '@remix-run/react'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import type { Post } from '~/sanity/types'

export default function Card({
  post,
  encodeDataAttribute,
}: {
  post: Post
  encodeDataAttribute: EncodeDataAttributeCallback
}) {
  return (
    <div className="card">
      {post.mainImage ? (
        <img
          data-sanity={encodeDataAttribute('mainImage')}
          className="card__cover"
          src={urlFor(post.mainImage).width(500).height(300).url()}
          alt=""
        />
      ) : (
        <div className="card__cover--none" />
      )}
      <div className="card__container">
        <Link
          data-sanity={encodeDataAttribute('slug')}
          className="card__link"
          to={post.slug?.current ? `/post/${post.slug.current}` : '/'}
        >
          <h3 className="card__title">{post.title}</h3>
        </Link>
        <p className="card__excerpt">{post.excerpt}</p>
        {post._createdAt && (
          <p className="card__date">{formatDate(post._createdAt)}</p>
        )}
      </div>
    </div>
  )
}
