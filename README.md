# Youssef Al-Ashry Portfolio

A production-ready personal portfolio built with Next.js, React, and TypeScript.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Use `npm run dev` during development. Run `npm run lint` and `npm run build` before deploying. The production server starts with `npm run start` after a successful build.

## Project Structure

```text
app/
  certificate-viewer.tsx      Certificate lightbox
  globals.css                 Global visual system and responsive styles
  layout.tsx                  Site metadata, fonts, and global layout
  page.tsx                    Home route
  portfolio-content.tsx       Page sections and composition
lib/
  portfolio-data.ts           Single source of truth for portfolio content
  portfolio-interactions.tsx  Scroll and motion behavior
  portfolio-work.tsx          Project filters and project details
  project-brief-form.tsx      Project inquiry form
  theme-toggle.tsx            Theme preference control

public/
  favicon.png
  images/
    certificates/             Certificate files used in the timeline
    profile/                  Profile photo
    projects/                 Project preview images
```

## Updating Content

- Edit text, links, projects, services, and milestones in `lib/portfolio-data.ts`.
- Add or replace certificates in `public/images/certificates/`, then update the matching `certificateImage` value in `lib/portfolio-data.ts`.
- Keep project preview files in `public/images/projects/` and reference them from `lib/portfolio-data.ts`.
- Use `app/globals.css` for visual styling and responsive behavior.

## Content API

All portfolio content has one source of truth in `lib/portfolio-data.ts`. The website uses the same data, and the API exposes it as read-only JSON for future dashboards, mobile apps, or a CMS integration.

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

## Deployment

The app is ready for Vercel or any Node.js host that supports Next.js. Set the deployment command to `npm run build` and the start command to `npm run start` when your host requires one.
