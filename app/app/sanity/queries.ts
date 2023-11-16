import groq from 'groq'

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`
