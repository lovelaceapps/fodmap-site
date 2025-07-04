This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

To generate a static site suitable for GitHub Pages:

```bash
npm run export
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## GitHub Pages Deployment

This repository includes a GitHub Actions workflow that builds and exports the Next.js site from the `site/` directory. Pushing to the `main` branch will automatically deploy the contents of `site/out` to GitHub Pages.

## Netlify Deployment

To deploy on Netlify, add a `netlify.toml` file at the repository root with the following configuration:

```toml
[build]
  base = "site"
  command = "npm run export"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

When connecting the repository on Netlify, it will run `npm run export` inside `site/` and serve the files from `site/out`.

