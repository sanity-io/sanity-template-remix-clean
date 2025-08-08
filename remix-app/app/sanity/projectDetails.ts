declare global {
  interface Window {
    ENV: {
      PUBLIC_SANITY_PROJECT_ID: string
      PUBLIC_SANITY_DATASET: string
      PUBLIC_SANITY_STUDIO_URL: string
    }
  }
}

const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_STUDIO_URL = 'http://localhost:3333',
} = typeof document === 'undefined' ? process.env : window.ENV

export const projectId = PUBLIC_SANITY_PROJECT_ID!
export const dataset = PUBLIC_SANITY_DATASET!
export const studioUrl = PUBLIC_SANITY_STUDIO_URL!

if (!projectId) throw new Error('Missing PUBLIC_SANITY_PROJECT_ID in .env')
if (!dataset) throw new Error('Missing PUBLIC_SANITY_DATASET in .env')
if (!studioUrl) throw new Error('Missing PUBLIC_SANITY_STUDIO_URL in .env')
