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
  portfolio-data.ts           Editable portfolio content
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

- Edit text, links, projects, services, and milestones in `app/portfolio-data.ts`.
- Add or replace certificates in `public/images/certificates/`, then update the matching `certificateImage` value in `app/portfolio-data.ts`.
- Keep project preview files in `public/images/projects/` and reference them from `app/portfolio-data.ts`.
- Use `app/globals.css` for visual styling and responsive behavior.

## Deployment

The app is ready for Vercel or any Node.js host that supports Next.js. Set the deployment command to `npm run build` and the start command to `npm run start` when your host requires one.
