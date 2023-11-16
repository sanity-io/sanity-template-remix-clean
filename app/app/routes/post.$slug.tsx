import { PortableText } from '@portabletext/react'
import { type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { formatDate } from '~/utils/formatDate'
import { urlFor } from '~/sanity/image'
import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import { POST_QUERY } from '~/sanity/queries'
import { Post } from '~/sanity/types'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<Post>(POST_QUERY, params)

  return { initial, query: POST_QUERY, params }
}

export default function PostRoute() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data, loading, error } = useQuery<typeof initial.data>(
    query,
    params,
    {
      initial,
    },
  )

  if (error) {
    throw error
  } else if (loading && !data) {
    return <div>Loading...</div>
  }

  return (
    <section className="post">
      {data?.mainImage ? (
        <img
          className="post__cover"
          src={urlFor(data.mainImage).url()}
          alt="Cover"
        />
      ) : (
        <div className="post__cover--none" />
      )}
      <div className="post__container">
        <h1 className="post__title">{data?.title}</h1>
        <p className="post__excerpt">{data?.excerpt}</p>
        {data?._createdAt && (
          <p className="post__date">{formatDate(data._createdAt)}</p>
        )}
        {data?.body && (
          <div className="post__content">
            <PortableText value={data.body} />
          </div>
        )}
      </div>
    </section>
  )
}
