import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {defineDocuments, defineLocations, presentationTool} from 'sanity/presentation'

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'project-name',
  title: 'Project Name',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/post/:slug',
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),
        locations: {
          post: defineLocations({
            select: {title: 'title', slug: 'slug.current'},
            resolve: (doc) => ({
              locations: [
                {title: doc?.title, href: `/post/${doc?.slug}`},
                {title: 'My Remix Sanity Homepage', href: `/`},
              ],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
