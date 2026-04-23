# My Page

Personal portfolio site for Joao Vitor de Oliveira Mendes — full-stack developer based in Belo Horizonte, Brazil.

**Live at** [mypage.joaovitor-oli-mendes.workers.dev](https://mypage.joaovitor-oli-mendes.workers.dev)

## What's in it

- **Art banner** — full-screen hero that cycles through public-domain paintings from the [Art Institute of Chicago API](https://api.artic.edu/docs/), with IIIF deep zoom via OpenSeadragon
- **Projects** — draggable card grid with FLIP animations, linking to GitHub repos
- **Work & Education** — vertical timeline of professional experience
- **Certifications** — live badge feed pulled from Credly
- **About Me** — bio and contact

## Stack

| Layer | Tech |
|-------|------|
| Framework | [vinext](https://github.com/nicolo-ribaudo/vinext) (Next.js API on Vite + React Server Components) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Runtime | Cloudflare Workers |
| APIs | Art Institute of Chicago IIIF, Credly, ZenQuotes |

## Getting started

```bash
npm install --include=dev
npm run dev            # local dev server
```

## Deploy

```bash
npx wrangler login     # authenticate with Cloudflare (once)
npm run build && npx wrangler deploy
```

Or use the all-in-one command:

```bash
npx vinext deploy
```

## Project structure

```
src/
  app/
    layout.tsx          # root layout (navbar + footer)
    page.tsx            # home page sections
    api/
      credly/route.ts   # proxy for Credly badges
      iiif/[...path]/   # proxy for AIC IIIF images
      quote/route.ts    # random quote from ZenQuotes
  components/
    Banner.tsx          # art carousel with deep zoom
    Projects.tsx        # draggable project grid
    Experience.tsx      # work/education timeline
    Certifications.tsx  # Credly badge grid
    AboutMe.tsx         # bio section
    DeepZoomViewer.tsx  # OpenSeadragon viewer
  data/
    projects.ts         # project list
    experience.ts       # work & education entries
```
