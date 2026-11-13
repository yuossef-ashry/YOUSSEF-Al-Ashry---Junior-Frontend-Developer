# Cloudflare Pages and Google Search

## Deployment

The Pages project is `youssef-al-ashry-portfolio`, with the production URL:

https://youssef-al-ashry-portfolio.pages.dev/

This is a **Direct Upload** Pages project. Pushing to GitHub saves the source and continues to trigger the existing Vercel integration; it does not automatically deploy to Pages. To publish an update from a machine authorized with your Cloudflare account:

```bash
npm ci
npx wrangler@4.161.0 login
npm run check
npm run deploy:pages
```

Login is needed only when the machine is not already authorized. Do not commit Wrangler credentials or paste API tokens into the repository. Direct Upload projects cannot be converted to Cloudflare's Git integration in place; a future automatic deployment can instead use a configured CI workflow with a scoped Pages token stored in the CI secret store.

`npm run build:pages` only creates the export locally. It defaults to the public origin in `cloudflare-pages.json`; `NEXT_PUBLIC_SITE_URL` can override this when moving to a new primary domain. If changing projects, update both the configuration and the project name in the deploy command.

The export has no runtime Functions, paid image service, or database. It can use the free Pages plan and its free `pages.dev` address. Account/build limits still apply. See [Cloudflare's static asset pricing](https://developers.cloudflare.com/pages/functions/pricing/) and [Pages limits](https://developers.cloudflare.com/pages/platform/limits/).

## Preserved behavior and performance

- The same UI, theme, project filters, device previews, certificate dialogs, and inquiry form are included.
- `/api/portfolio` and the individual `/api/*` resources are generated from `lib/portfolio-data.ts` during each build. They remain read-only and require a deployment to update.
- Sharp generates responsive WebP images during the build. Their URLs include a content version so browser caching cannot retain an old image after the source changes. SVG previews keep their vector source.
- Fonts are bundled by Next.js and served from the site's own origin.
- `_headers` supplies JSON content types, prevents API indexing, and enables long caching for versioned assets. `404.html` provides real missing-page responses.
- The normal `npm run build` remains available for Vercel and Node.js hosts.

## Google Search Console

The site includes a title, description, canonical URL, social preview metadata, a ProfilePage/Person JSON-LD description, `robots.txt`, and `sitemap.xml`. The owner's supplied public Google verification token is kept in `lib/site-config.ts` so future deployments retain it. Adding the tag does not itself complete Google's Verify action or submit an indexing request.

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Add a **URL prefix** property: `https://youssef-al-ashry-portfolio.pages.dev/`. Domain verification requires DNS ownership, so use URL prefix for a shared `pages.dev` domain.
3. Choose **HTML tag**, then copy just the value of `content` in the `google-site-verification` tag.
4. The current owner's token is already configured. For a different token, update `googleSiteVerification` in `lib/site-config.ts`, or override it in an ignored `.env.local` file:

   ```dotenv
   GOOGLE_SITE_VERIFICATION=the_actual_value_from_google
   ```

5. Run `npm run deploy:pages`, check that the public home page contains the verification meta tag, then click **Verify** in Search Console. Keep the tag in future builds.
6. In **Sitemaps**, submit `sitemap.xml`. The full address is `https://youssef-al-ashry-portfolio.pages.dev/sitemap.xml`.
7. Inspect the home page URL in **URL inspection**, run a live test if needed, and choose **Request indexing**.

Google says crawling may take days to weeks and requests do not guarantee inclusion. See [Google's indexing guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

## Profile links

Use `https://youssef-al-ashry-portfolio.pages.dev/` in GitHub's profile website field and the repository's About website field. In LinkedIn, add it to your profile's contact information and, if desired, Featured section. These account changes are separate from deploying this repository.

## Verification record

Record deployment checks and any remaining account-dependent steps in `docs/quality-review.md`. Search Console verification, sitemap submission, indexing requests, and profile changes must be confirmed in the relevant account before being described as complete.
