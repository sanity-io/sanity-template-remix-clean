import {useLoaderData, type MetaFunction} from '@remix-run/react'
import {type LoaderFunctionArgs} from '@remix-run/node'
import {useQuery} from '@sanity/react-loader'
import Card from '~/components/Card'
import Welcome from '~/components/Welcome'
import {client} from '~/sanity/client'
import {POSTS_QUERY} from '~/sanity/queries'
import {Post} from '~/sanity/types'
import {previewContext} from '~/sanity/preview'

export const meta: MetaFunction = () => {
  return [{title: 'New Remix App'}]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { options } = await previewContext(request.headers);
  
  const initial = await client.fetch<Post[]>(POSTS_QUERY, {}, options);

  return {initial: { data: initial }, query: POSTS_QUERY, params: {}}
}

export default function Index() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading, error, encodeDataAttribute} = useQuery<typeof initial.data>(query, params, {
    // @ts-expect-error -- TODO fix the typing here
    initial,
  })

  if (error) {
    throw error
  } else if (loading && !data) {
    return <div>Loading...</div>
  }

  return (
    <section>
      {data?.length ? (
        data.map((post, i) => (
          <Card key={post._id} post={post} encodeDataAttribute={encodeDataAttribute.scope([i])} />
        ))
      ) : (
        <Welcome />
      )}
    </section>
  )
}
