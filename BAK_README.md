# A minimal Remix site with Sanity Studio

This starter uses [Remix](https://remix.run/) for the front end and [Sanity](https://sanity.io/) to handle its content.

## Featuring

- How to fetch content as data from [the Sanity Content Lake](https://www.sanity.io/docs/datastore)
- How to render block content with [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- A [Sanity Studio](https://www.sanity.io/docs/sanity-studio) to create and edit content
- Visual editing with live updates through [Presentation](https://www.sanity.io/docs/presentation)
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

Run the following commands to prepare both applications:

1. From the root of the repository, install dependencies

```sh
pnpm install
```

2. Select or create a Sanity project and dataset, and output the details to a `.env.local` file

```sh
cd studio && pnpm sanity init --env .env.local
```

3. From the **root directory**, copy environment variables from the Studio folder to the Remix folder

```sh
cp ./studio/.env.local ./app/.env
```

4.  Start the development servers:

```sh
pnpm dev
```

- Your Remix app should now be running on [http://localhost:3000/](http://localhost:3000/)
- Your Studio should now be running on [http://localhost:3333/](http://localhost:3333/).

_Feel free to move each of the folders to their own location and check them into version control._

### Enable Visual Editing in the Remix app

Update the `.env` file in the `/app` directory to enable "stega", which is required for [Presentation](https://www.sanity.io/docs/presentation).

```
# ./app/.env
SANITY_STUDIO_STEGA_ENABLED="true"
```

### Add content in the Studio

1. Visit the Studio and create and publish a new `Post` document
2. Visit the App and refresh the page to see your content rendered on the page

The schema for the `Post` document is defined in the `/studio/schemas` folder. You can add more documents and schemas to the Studio to suit your needs.

## Deployments

The `/app` and `/studio` folders are meant to be deployed separately.

Make sure that after `/app` is deployed the `.env` file in `/studio` is updated with its deployment URL under `SANITY_STUDIO_PREVIEW_URL`.

And `/app` has a `.env` file with `SANITY_STUDIO_URL` that points to the Studio's deployment URL.
