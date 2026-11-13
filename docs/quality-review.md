# Portfolio Quality Review

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
