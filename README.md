# Youssef Al-Ashry Portfolio

A production-ready personal portfolio built with Next.js, React, and TypeScript.

[View the live portfolio](https://youssef-al-ashry-portfolio.pages.dev/)

## Commands

```bash
npm ci
npm run dev
```

`npm run check` runs ESLint and TypeScript. `npm run build` creates the production build; `npm start` serves it. Use the Node.js version required by the installed Next.js release.

## Project Structure

```text
app/                         Next.js routes, metadata, and global styles
  api/                       Read-only content API
components/
  portfolio/                 Page composition and scroll interactions
  projects/                  Project gallery, details, and device preview
  services/                  Interactive package offer and related project examples
  certificates/              Certificate viewer
  contact/                   Project inquiry form
  layout/                    Theme control
  ui/                        Shared modal and keyboard behavior
lib/
  portfolio-data.ts          Content used by the website and API
  portfolio-types.ts         Project types and API response validation
  preview-devices.ts         Device sizes for live previews
  site-config.ts             Public origin for metadata, robots, and sitemap
  static-image-loader.ts     Build-time responsive images for Pages
scripts/
  build-pages.mjs            Static export and local image optimization
cloudflare-pages.json        Pages project name and public URL
public/
  favicon.png
  images/
    certificates/            Certificate images
    profile/                 Lossless WebP portrait
    projects/                Project screenshots
```

## Updating Content

- Edit text, links, projects, services, and milestones in `lib/portfolio-data.ts`.
- Add or replace certificates in `public/images/certificates/`, then update the matching `certificateImage` value in `lib/portfolio-data.ts`.
- Keep project preview files in `public/images/projects/` and reference them from `lib/portfolio-data.ts`.
- Use `app/globals.css` for visual styling and responsive behavior.
- Update shared contact links and navigation in `profile` and `navigation` in the data file.
- The removed template files remain recoverable from Git history. Only current site assets are shipped.

## Project Previews

The preview toolbar switches one live iframe between Laptop (1440 x 900), Tablet (820 x 1180), and Phone (390 x 844). Its viewport changes without reloading the project. The displayed frame scales to the available space while retaining the selected device's actual responsive breakpoint.

Projects without a `liveUrl` display a screenshot in the laptop frame; responsive controls are disabled because a screenshot cannot show a different responsive layout. Live previews load only after opening a project, with connection hints on hover/focus. External hosts must allow iframe embedding; the Live demo link also opens the project directly.

The toolbar always offers a direct live-project link. A non-blocking loading message offers retry after 12 seconds if loading takes longer. Retry reloads only the iframe and preserves the selected device. Desktop filters return to the first project before the sticky section changes height; compact styles keep project actions visible on short laptop screens.

Project and certificate dialogs share focus handling, Escape/backdrop dismissal, and scroll locking. Project headers stay visible while the preview content scrolls.

## Content API

The Packages section uses `components/services/project-offer.tsx` and the shared `packages` data. Update `startingPrice` in `lib/portfolio-data.ts` to change a price; the displayed `price` string is derived from it for the website and API. `exampleTitle` must match an existing project title. Selecting a package updates its features and real project example, then passes its project type and budget to the contact brief without replacing the visitor's written details. WhatsApp links prepare a draft for the visitor to review.

Collections, profile links, and navigation share `lib/portfolio-data.ts` between the website and the API. Section layout and editorial copy live in `components/portfolio/portfolio-content.tsx`. The API is read-only JSON; changing the data file requires a new deployment.

| Endpoint | Returns |
| --- | --- |
| `/api/portfolio` | The complete portfolio data object |
| `/api/profile` | Personal details and contact links |
| `/api/navigation` | Site navigation items |
| `/api/projects` | Project portfolio |
| `/api/skills` | Technical skills |
| `/api/services` | Service overview |
| `/api/serviceDetails` | Detailed service offerings |
| `/api/processSteps` | Working process |
| `/api/milestones` | Experience and certificates |
| `/api/packages` | Service packages and pricing |

`PortfolioWork` requests `/api/projects` in the browser after the initial server render. It keeps the server-provided projects as a fallback, so the work section stays visible even if an API request fails.

API responses are generated from the content file at build time. On Pages they are served as JSON files at the same URLs, with cache revalidation after deployment. Unknown resources return 404. Updating content requires rebuilding and deploying.

## Deployment

For Vercel, select the Next.js preset with this folder as the project root. Run `npm run check` and `npm run build` before pushing. A connected Vercel project deploys changes from its configured production branch.

Set `NEXT_PUBLIC_SITE_URL` to the final public site URL to update the metadata base. `.env.example` lists the optional setting. Local environment files and `.vercel/` are ignored by Git.

On a Node.js host, run `npm ci`, `npm run build`, then `npm start`. The normal build retains Next.js image optimization. Dependencies and generated output are not source files to commit.

For Cloudflare Pages, see [deployment and Google setup](docs/cloudflare-pages.md). `npm run build:pages` exports the site to `out/`, generates responsive WebP assets, and preserves the read-only JSON endpoints. `npm run deploy:pages` builds and uploads the result to the configured Pages project.

## Quality Review

See [the quality review](docs/quality-review.md) for the tested viewports, corrected issues, and verification limits.
