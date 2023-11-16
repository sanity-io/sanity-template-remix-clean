import { useLoaderData, type MetaFunction } from '@remix-run/react'
import Card from '~/components/Card'
import Welcome from '~/components/Welcome'
import { useQuery } from '~/sanity/loader'
import { loadQuery } from '~/sanity/loader.server'
import { POSTS_QUERY } from '~/sanity/queries'
import { Post } from '~/sanity/types'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export const loader = async () => {
  const initial = await loadQuery<Post[]>(POSTS_QUERY)

  return { initial, query: POSTS_QUERY, params: {} }
}

export default function Index() {
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
    <section>
      {data?.length ? (
        data.map((post) => <Card key={post._id} post={post} />)
      ) : (
        <Welcome />
      )}
    </section>
  )
}
