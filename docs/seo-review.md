# Portfolio SEO review — 2026-11-22

Primary URL: https://youssef-al-ashry-portfolio.pages.dev/

Preferred name: **Youssef El-Ashry**. The earlier Al-Ashry spelling and Arabic name remain alternate names in the connected WebSite/Person structured data.

## Checklist against the requested launch plan

| Item | Current evidence | Status |
| --- | --- | --- |
| Public URL | The existing Pages home page returns HTTP 200. The legacy Vercel site points its canonical to Pages. | Verified |
| Search title | The title identifies Youssef El-Ashry and the Junior Frontend Developer role. | Verified |
| Description | The description identifies the developer, location, React/JavaScript/TypeScript work, projects, and freelance services. | Updated |
| Headings | One visible H1 now groups the existing name label and role without adding another display heading. About introduces the developer in natural language. | Updated |
| Search Console | The current browser session required Google to verify the owner's identity again. Current crawl date, performance metrics, and indexing-request acceptance were not confirmed. | Account access needed |
| Sitemap and robots | Both public files return HTTP 200 with the correct content types and primary URL. Crawling is allowed. This does not verify Search Console's processing status. | Technical checks passed |
| Speed and mobile | Google's PageSpeed website completed baseline and post-deployment tests after the direct API returned HTTP 429. Post-deployment performance was 94/100 on mobile and 100/100 on desktop, with accessibility, best practices, and SEO at 100 on both. No field data was available. | Measured in the lab |
| Structured data | WebSite, ProfilePage, Person, and ImageObject are connected by IDs and identify the same person, portrait, and canonical site. | Verified |
| Project content | All seven selected project articles, descriptions, technologies, demo/source links, and existing highlights are present in the exported HTML. | Verified |
| Professional profile links | GitHub's display name and Profile README use the preferred name and link to the portfolio. LinkedIn's display name and both language versions of About now use Youssef El-Ashry. The portfolio link was already present in About, Featured, and Contact info; its email matches the site's public email. Saved changes were verified in the account UI. | Completed |
| Contact | Email, phone, WhatsApp, and the project brief remain available. No test inquiry or message was sent. | Links verified |
| Monitoring | Search Console remains the source for actual impressions, clicks, query data, and position. No current private report was available in this review. | Account access needed |

Google's [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) distinguishes improvements to discovery and understanding from guaranteed search placement. Its [recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) explains that repeated requests do not speed up crawling.

## Project presentation changes

- Replaced the rotated browser card with a straight laptop frame and a light base, using the existing theme colors.
- Increased the desktop preview width from 31vw to 38vw and updated the image's responsive size hint.
- Preserved whole-image previews using the current project data's `imageWidth` and `imageHeight`. The image defines the screen height without stretching, cropping, or artificial bands.
- Removed duplicate per-project frame styling. The shared frame supports light/dark themes and the existing mobile project list.
- Preserved project-card activation, the live iframe, device controls, close behavior, and focus restoration.

## Validation

- ESLint and the static production build, including TypeScript, passed.
- The export retained the portfolio, API, and metadata routes and build-time responsive image generation.
- Checked the exported home page for one H1 containing the preferred name and role, seven server-rendered project articles, structured identity data, large-image-preview permission, ownership verification, and the primary sitemap URL.
- Browser layout checks cover desktop and mobile layouts, including a 720px-high laptop and a 320px-wide phone. The current collection starts with FreshCart and preserves the seven-project order and package examples from the latest source.
- Clicking a project frame opened its details. Tablet showed 820x1180; Phone showed 390x844 with one iframe. Closing removed the dialog and returned keyboard focus to the project card.
- Checked both light and dark themes. Saved desktop/mobile screenshots as private review artifacts rather than shipping them in the public site.

## Search observation

A signed-out Google search for **Youssef El-Ashry Frontend Developer**, using English and Egypt settings, showed the portfolio as the first ordinary web result during this review. Google still displayed its earlier Al-Ashry title. This observation preceded the changes in this review and is not a promise about the name-only query, other users, countries, or future rankings.

## Performance follow-up

The official [mobile report](https://pagespeed.web.dev/analysis/https-youssef-al-ashry-portfolio-pages-dev/c05ibdxbai?form_factor=mobile) measured FCP 1.0s, LCP 2.6s, TBT 0ms, CLS 0, and Speed Index 2.8s. The [desktop report](https://pagespeed.web.dev/analysis/https-youssef-al-ashry-portfolio-pages-dev/c05ibdxbai?form_factor=desktop) measured FCP 0.3s, LCP 0.6s, TBT 10ms, CLS 0, and Speed Index 0.6s. These were single Lighthouse 13.6.0 lab runs on the published site, before the following responsive-image adjustment. PageSpeed reported **No Data** for real-user measurements; this is not a field Core Web Vitals pass.

The mobile image-delivery audit identified a 750px portrait being used for a 651px target. Added 512px and 672px variants to the existing image pipeline and made both hero portrait elements share an accurate desktop size hint, `min(64vh, 40vw)`. Both still share one image preload. The 672px variant is 55,924 bytes rather than 69,440 bytes for 750px; the 512px variant is 35,472 bytes rather than 52,780 bytes for 640px. The browser chooses a variant according to viewport and pixel density. The source portrait, image quality setting, layout, and animations are unchanged.

ESLint and the production export, including TypeScript, passed after the change. All 165 responsive variants were generated; the build checks confirmed that the new variants exist and the hero uses one shared preload.

### Post-deployment measurement

A fresh [mobile report](https://pagespeed.web.dev/analysis/https-youssef-al-ashry-portfolio-pages-dev/7ujos9k13u?form_factor=mobile) measured performance **94**, FCP 1.5s, LCP 2.5s, TBT 40ms, CLS 0, and Speed Index 4.4s. The fresh [desktop report](https://pagespeed.web.dev/analysis/https-youssef-al-ashry-portfolio-pages-dev/7ujos9k13u?form_factor=desktop) measured performance **100**, FCP 0.3s, LCP 0.5s, TBT 0ms, CLS 0, and Speed Index 0.5s. Accessibility, best practices, and SEO scored 100 in both reports. These were single Lighthouse 13.6.0 lab runs, captured at 23:16 GMT+2 on 22 November 2026.

The mobile image-delivery warning no longer appeared in the fresh report, and LCP decreased from 2631ms to 2501ms. However, mobile FCP and Speed Index increased and the overall score fell from 96 to 94. Single runs vary with execution and network conditions; this does not establish an overall performance improvement. Both reports still had **No Data** for real-user measurements.

Public deployment checks confirmed HTTP 200 for the home page, all seven project API entries, robots.txt, sitemap.xml, and the new 512px/672px WebP portrait files. The published HTML contains the new image digest, the accurate size hint, and one shared portrait preload.
