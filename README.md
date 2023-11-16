# A minimal Remix site with Sanity Studio

This starter uses [Remix](https://remix.run/) for the frontend and [Sanity](https://sanity.io/) to handle its content.

## Featuring

- How to fetch content as data from [the Sanity Content Lake](https://www.sanity.io/docs/datastore)
- How to render block content with [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- A [Sanity Studio](https://www.sanity.io/docs/sanity-studio) to create and edit content
- How to crop and render images with [Sanity Image URLs](https://www.sanity.io/docs/image-url)

> **Note**
>
> This starter features an `/app` and a `/studio` folder. The `/app` folder contains the frontend code, and the `/studio` folder contains the Sanity Studio code.
>
> This is **not** a monorepo setup. We put them both in one repository for the sake of simplicity. You might want to have separate repositories for each of the folders, to make it easier to deploy the app and the studio separately.

## Prerequisities

- [Node.js](https://nodejs.org/en/) (v14.18 or later)
- [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) (optional)

## Getting started

The following commands are meant to be run in **both** the `/app` and `/studio` folders.

1. `pnpm install` to install dependencies
2. `cd studio && pnpm sanity init --env .env.local`, this will:

- ask you to select or create a Sanity project and dataset
- output a `.env.local` file with appropriate variables

3.  `cp ./studio/.env.local ./app/.env`.

4.  Start the development servers using `pnpm dev`

Your Remix app should now be running on [http://localhost:3000/](http://localhost:3000/) and Studio on [http://localhost:3333/](http://localhost:3333/).

_Feel free to move each of the folders to their own location and check them into version control._

### Add content

1. Visit the Studio and create and publish a new `Post` document
2. Visit the App and refresh the page to see your content rendered on the page

The schema for the `Post` document is defined in the `/studio/schemas` folder. You can add more documents and schemas to the Studio to suit your needs.

## Deployments

The `/app` and `/studio` folders are meant to be deployed separately.

Make sure that after `/app` is deployed the `.env` file in `/studio` is updated with its deployment URL under `SANITY_STUDIO_PREVIEW_URL`.
And `/app` has a `.env` file with `SANITY_STUDIO_URL` that points to the Studio's deployment URL.
