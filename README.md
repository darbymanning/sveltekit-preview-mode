# A prerenered blog example using SvelteKit and GraphCMS

This example showcases is a proof of concept for CMS Preview Mode with SvelteKit, using [GraphCMS](https://www.graphcms.com/) as the data source. This is intended to be a Svelte equivelant of the [Next.js Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode).

## Demo

- **Live**: [https://sveltekit-preview-mode.vercel.app/](https://sveltekit-preview-mode.vercel.app/)
- **Preview Mode**: [https://sveltekit-preview-mode.vercel.app/preview.json...](https://sveltekit-preview-mode.vercel.app/preview.json?secret=quiet-as-a-mouse&slug=union-types-and-sortable-relations)

### [https://sveltekit-preview-mode.vercel.app/](https://sveltekit-preview-mode.vercel.app/)

## Deploy your own

Once you have access to [the environment variables you'll need](#step-3-set-up-environment-variables), deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/darbymanning/sveltekit-preview-mode&project-name=sveltekit-preview-mode&repository-name=sveltekit-preview-mode&env=VITE_GRAPHCMS_PROJECT_API,VITE_GRAPHCMS_PROD_AUTH_TOKEN,VITE_GRAPHCMS_DEV_AUTH_TOKEN,VITE_GRAPHCMS_PREVIEW_SECRET&envDescription=Required%20to%20connect%20the%20app%20with%20GraphCMS&envLink=https://github.com/darbymanning/sveltekit-preview-mode#step-3-set-up-environment-variables)

## How to use

Clone this repository.

```bash
$ git clone https://github.com/darbymanning/sveltekit-preview-mode
```

## Configuration

### Step 1. Create an account and a project in GraphCMS

First, [create an account in GraphCMS](https://app.graphcms.com).

### Step 2. Create a new GraphCMS project

After creating an account, create a new project from the **Blog Starter template** - be sure to include the example content.

### Step 3. Set up environment variables

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Inside your project dashboard, navigate to **Settings > API Access page**.

Then set each variable in `.env.local`:

- `VITE_GRAPHCMS_PROJECT_API`: Set it to the API endpoint under **Endpoints**, at the top of the page.
- `VITE_GRAPHCMS_PROD_AUTH_TOKEN`: Copy the `NEXT_EXAMPLE_CMS_GCMS_PROD_AUTH_TOKEN` token under **Existing tokens**, at the bottom of the page. This will only query content that is published.
- `VITE_GRAPHCMS_DEV_AUTH_TOKEN`: Copy the `NEXT_EXAMPLE_CMS_GCMS_DEV_AUTH_TOKEN` token under **Existing tokens**, at the bottom of the page. This will only query content that is in draft.
- `VITE_GRAPHCMS_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET` - this is used for Preivew Mode.

### Step 4. Run SvelteKit in development mode

```bash
npm install
npm run dev

# or

yarn
yarn dev
```

Your blog should be up and running on [http://localhost:3000](http://localhost:3000)!

### Step 5. Try preview mode

In GraphCMS, go to one of the posts in your project and:

- **Update the title**. For example, you can add `[Draft]` in front of the title.
- After you edit the document save the article as a draft, but **DO NOT** click **Publish**. By doing this, the post will be in the draft stage.

Now, if you go to the post page on localhost, you won't see the updated title. However, if you use **Preview Mode**, you'll be able to see the change.

To view the preview, transform the url to the following format: `http://localhost:3000/preview.json?secret=<YOUR_SECRET_TOKEN>&slug=<SLUG_TO_PREVIEW>` where `<YOUR_SECRET_TOKEN>` is the same secret you defined in the `.env.local` file and `<SLUG_TO_PREVIEW>` is the slug of one of the posts you want to preview.

You should now be able to see the updated title. To exit the preview mode, you can click on _"Click here to exit preview mode"_ at the top.

### Step 6. Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com) as it is setup to use the vercel adapter. Other providers with the appropriate adapter supporting endpoints should work aswell (ie. Netlify).

#### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/darbymanning/sveltekit-preview-mode&project-name=sveltekit-preview-mode&repository-name=sveltekit-preview-mode&env=VITE_GRAPHCMS_PROJECT_API,VITE_GRAPHCMS_PROD_AUTH_TOKEN,VITE_GRAPHCMS_DEV_AUTH_TOKEN,VITE_GRAPHCMS_PREVIEW_SECRET&envDescription=Required%20to%20connect%20the%20app%20with%20GraphCMS&envLink=https://github.com/darbymanning/sveltekit-preview-mode#step-3-set-up-environment-variables)
