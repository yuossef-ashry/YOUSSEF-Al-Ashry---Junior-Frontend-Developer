# Portfolio Quality Review

## Interactive Package Offer — 2026-11-14

Reworked the opening of the existing Packages section into an interactive offer, using the portfolio's typography, colors, themes, and related project images. Its existing navigation target remains `#pricing`. The former duplicate price cards were removed; the statistics and rotating milestones remain below the offer.

- Three choices use the existing starting prices: Starter EGP 2,500, Professional EGP 5,000, and Custom web app EGP 10,000+. A single numeric price in the shared data now generates the public price string for the UI and API.
- Each selection updates the price, features, related real project, and WhatsApp draft. Related examples open in the existing project dialog, including device previews and dismissal/focus handling.
- Starting a package fills the brief's project type and budget and includes the package in its prepared message. Previously typed visitor details remain intact. Manually changing a selection clears the old package context and draft.
- No dependencies, AI service, remote font, fabricated discount, delivery guarantee, or additional hosting service was added.

Browser checks covered three package states at seven Chrome viewport/theme combinations from 320px to 1530px and an Edge laptop viewport. They found no checked text clipping, horizontal overflow, or page JavaScript errors. Full package-to-brief journeys passed on desktop/mobile, including preservation of written details, prepared draft content, manual selection changes, project dialog dismissal, and focus restoration. Selected axe checks on the offer passed in desktop light/dark and mobile dark themes. Project-dialog tests used fixture demo pages; `window.open` was stubbed for draft tests, so no message was sent.

Published application commit `c353567` to GitHub and Pages, then confirmed all three offer flows on the public URL at desktop/mobile sizes. The public API resources, canonical, verification tag, robots, sitemap, image delivery, and missing-route checks passed. One public Lighthouse run per device measured performance 89 on mobile (LCP 2.67s, TBT 290ms, CLS 0) and 99 on desktop (LCP 0.59s, TBT 37.5ms, CLS 0). Accessibility, best practices, and SEO scored 100 in both runs. These are individual lab measurements with connection/CPU variation, not field-performance guarantees.

## Desktop Projects Follow-up — 2026-11-14

Primary production URL: https://youssef-al-ashry-portfolio.pages.dev/

The previous first-project preview check did not cover the full desktop scrolling sequence. Reproducing that sequence exposed a real defect: projects 2–10 scrolled out of view while their counter continued changing. `body { overflow-x: hidden }` created the wrong scrolling ancestor for the sticky scenes. Using `overflow-x: clip` restores document-based sticky positioning while retaining horizontal clipping.

Additional corrections:

- Adjusted project copy spacing and added compact styles for short desktop viewports so titles, tags, and all actions remain visible.
- Changing a desktop filter resets to the start of the work section before its height changes. Pending project animation timers are cancelled so an old counter cannot overwrite the new collection's counter.
- Live previews show a non-blocking loading status. After 12 seconds they offer retry; a direct project link is always available. Retrying preserves the selected device and keeps keyboard focus inside the dialog.
- Corrected the shared public email to `yassef0100@gmail.com`, as confirmed by the owner. Both the rendered mail links and the JSON API use it.

Final export checks passed:

- ESLint, TypeScript, the normal Next.js production build, and the Cloudflare Pages export.
- All ten project positions and their clickable actions in Chrome at 1280x720, 1366x768, 1440x900, 1024x600, 1280x600, and 1920x1080; the same ten positions in Edge at 1280x720 and 1024x600 (80 project/viewport checks in total). Filter resets returned to project 01 in each case.
- All page sections at nine desktop/tablet/mobile viewports listed below, with no detected horizontal overflow, clipped checked headings/actions, broken section links, or main-page JavaScript errors. Contact content appeared and the mobile menu closed with Escape.
- Automated axe checks found no selected-rule violations in light and dark themes on desktop/mobile. The actual theme control and persistence after reload were checked; blocked storage did not crash the page.
- Project/certificate close-button, Escape, backdrop, focus restoration, three device sizes, preserved iframe document when switching devices, mobile host sizes, image fallback, filters, all four landscape certificates, inquiry validation, API resources/404s, malformed-API fallback, and corrected email checks passed.
- A controlled delayed-preview test confirmed loading/slow feedback, direct link, retry, retained phone dimensions, retained dialog focus, and dismissal.
- `npm audit --omit=dev` reported zero known production dependency vulnerabilities at review time.

Preview control regression tests used deterministic fixture pages; separate real-network checks exercised the nine external live previews. Some external resources were slow, and one direct Modern Developer Portfolio request exceeded 20 seconds even though its iframe rendered content in the browser check. External hosting speed and app functionality are not guaranteed by the portfolio tests. This is why the loading feedback, retry, and direct link remain available. Inquiry tests stubbed `window.open`; no test message was sent.

The owner has since confirmed that Google indexed the primary home page (Search Console reported a successful smartphone crawl on 2026-11-13 at 12:58:18). GitHub and LinkedIn profile website links were also saved and checked separately. A manual reindex request is not a prerequisite for an already indexed page.

Published application commit `36df196` to GitHub and Cloudflare Pages. Repeated all 60 Chrome project/viewport checks and the project/certificate interaction suite on the primary public URL; they passed. Public checks also confirmed the corrected email, ten JSON endpoints, missing-resource 404s, canonical URL, verification tag, robots, sitemap, and responsive image delivery, with no main-page JavaScript errors.

One final public Lighthouse run per device measured performance 96 on mobile (LCP 2.14s, TBT 53ms, CLS 0.0115) and 100 on desktop (LCP 0.54s, TBT 3ms, CLS 0). Accessibility, best practices, and SEO scored 100 in both runs. These single lab runs describe this test environment and are not field measurements or a guarantee for every visit.

## Earlier Review — 2026-11-13

Reviewed on 2026-11-13 against the public site and the corrected production build.

Public URL: https://youssef-al-ashry-junior-frontend-de.vercel.app/

## Findings Addressed

- Contact content could remain hidden on short landscape screens because its reveal threshold was larger than the visible area. Reveal now starts when the section enters the viewport.
- The mobile menu now supports Escape, keyboard focus, scroll locking, and closing when switching to a desktop layout. Its links remain reachable on short screens.
- Inactive desktop project panels no longer receive keyboard focus or appear in the accessibility tree. All project panels remain accessible in the mobile layout.
- Small-text contrast was corrected in both themes, including the certificate dialog. Header colors remain readable over every section.
- Horizontal decoration overflow and the hero's short-screen spacing were corrected.
- Contact content now has a clear order and a direct project-brief action without overlapping portrait decoration.
- The brief form rejects whitespace-only required fields, trims submitted values, limits input lengths, and provides a direct WhatsApp draft link as a fallback.
- Theme switching handles blocked local storage without a JavaScript error.
- Corrected the canonical/share domain and added robots.txt and sitemap.xml.
- Hero content no longer waits for every page resource to finish loading; image sizes and loading priority were adjusted.
- Fonts are served by Next.js from the site's own origin rather than requested from Google by visitors. The hero portrait no longer waits for an initial entrance movement, and mobile actions share a row to keep the first view compact.

## Checks Completed

- ESLint, TypeScript, and the production build passed.
- Chromium layout checks passed at 1920x1080, 1440x900, 1280x720, 1024x768, 999x800, 768x1024, 390x844, 320x740, and 844x390.
- No horizontal overflow or clipped content headings were detected in those checks.
- Automated axe checks reported no violations for the selected WCAG rules on the fully revealed page in light/dark themes at desktop/mobile sizes, and inside the project and certificate dialogs.
- Device switching preserved the same iframe document while changing its actual viewport. Filters, image fallback, dialog dismissal, focus restoration, and resize behavior passed.
- All four certificate images loaded in landscape orientation.
- The content API, unknown-resource 404s, malformed-response fallback, canonical URL, robots, and sitemap passed their checks.
- All nine live-demo links, ten source repositories, and the certificate-verification link returned HTTP 200 during the review.
- Form tests used a local window.open stub. No test message or contact data was sent to WhatsApp.

## Measurement Limits

The initial public Lighthouse mobile run scored performance 97, accessibility 96, best practices 100, and SEO 100. This is a lab measurement, not field data or a conversion-rate measurement.

Browser checks used Chrome through Playwright with emulated viewports. Physical iOS/Safari devices and Firefox were not tested. Automated accessibility checks do not replace a manual assistive-technology review. External demos and WhatsApp remain dependent on their own hosting, availability, and policies. Customer conversion needs real visitor/contact data; it cannot be guaranteed by a technical review.

## Cloudflare Pages Release — 2026-11-13

Production URL: https://youssef-al-ashry-portfolio.pages.dev/

- Added a static Pages export while retaining the normal Next.js/Vercel build. ESLint, TypeScript, both build modes, and Git whitespace checks passed.
- Published the Pages export and verified HTTP 200, the owner's exact Google verification meta tag, the primary canonical URL, robots.txt, sitemap.xml, and ProfilePage/Person JSON-LD on the public site.
- All ten JSON endpoints returned their expected data and JSON content type. Missing resources returned 404. API responses have noindex headers; the home page has no noindex directive.
- Generated 126 responsive WebP images at build time (4.23 MiB combined). The mobile hero selected a 32,094-byte WebP with versioned asset caching. SVG project previews retain their original vector source.
- Re-ran the project/certificate interaction checks on the public Pages URL: laptop/tablet/phone viewports, one preserved iframe, 320px/390px mobile hosts, screenshot fallback, all four landscape certificates, close/Escape/backdrop behavior, focus restoration, filters, menu, theme, and malformed-API fallback passed. No main-page JavaScript errors or third-party font requests were reported.
- Checked inquiry-form validation with window.open stubbed; no test message was sent.
- Kept the public verification token in source so future builds retain ownership verification support. The owner confirmed successful Google Search Console ownership verification and sitemap submission. The separate URL inspection indexing request is still pending owner confirmation.
- Added the production link to the repository README. Personal GitHub and LinkedIn profile fields are managed separately in those accounts.

Public Pages Lighthouse measurements used three mobile runs (performance 82, 92, and 84; median 84, median LCP 2.62s, median TBT 286.5ms) and a confirmation desktop run (performance 98, LCP 0.54s, TBT 0). Accessibility, best practices, and SEO scored 100 in the confirmation runs. An earlier desktop SEO check timed out fetching robots.txt; direct HTTP verification and the confirmation run succeeded. These are lab results on this machine and connection, with variation between runs; they are not a field-performance guarantee.
