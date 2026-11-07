# Kitsch Website (Electronic Press Kit): Plan

Status: **First full version built** (`index.html`, `css/styles.css`, `js/main.js`). Real logo and photos are in; bio, Spotify, TikTok, and YouTube links are placeholders marked `TODO` in `index.html`. Open items are marked `[?]`; anything we're waiting on from the band is in **Reminders**.

## Reminders (things Charlie owes me)

- [ ] **Logo original file.** Received a 1254x1254 JPEG (WhatsApp export) in `design-reference/logo/`. It has a white background with a fake transparency checkerboard baked in. Ask whether an original PNG with real transparency, or an SVG, exists. If not, I'll cut the circle out into a transparent PNG myself.
- [x] ~~Color palette reference images~~: palette now comes from the logo (section 5).
- [x] Heading font: Coiny.
- [x] Body font: Nunito.
- [x] Bio text (quote style, attributed to "J.C (Jesus Christ)").
- [ ] Spotify link (no profile yet; placeholder for now).
- [ ] YouTube links for 3 to 5 live clips (none posted yet; placeholders for now).
- [x] Band photos: 6 received (all landscape, 3:2) in `design-reference/band_shots/`. Hero is IMG_9492 (the kick photo, outside a house at night); the other 5 are in the carousel, with IMG_9555-3 (street at night) last. Web versions in `assets/images/`.
- [x] Instagram: @kitsch.ca
- [ ] TikTok handle (placeholder for now).
- [ ] Decision on extras (section 3).

## 1. Purpose

An electronic press kit (EPK) for **Kitsch**, a funk band. The audience is bookers, venues, promoters, press, and labels. A visitor should be able to, within about 30 seconds:

1. See who the band is and what they sound like.
2. Watch a live clip.
3. Grab what they need (photos, logo, bio, contact) without emailing us first.

## 2. Content

| Section | Content | Status |
| --- | --- | --- |
| Logo | Band logo image, top of page | Waiting on file and format |
| Hero photo | One big band photo directly under the logo | Waiting on photo |
| Bio | Band bio as a pull quote | Done |
| Photos | 5 landscape band photos in a horizontal carousel | Done |
| Videos | 3 to 5 live clips, YouTube embeds | Placeholders until videos are posted |
| Links | Spotify (link only, no embed), Instagram, TikTok | Instagram: https://www.instagram.com/kitsch.ca/ ; Spotify and TikTok placeholders |
| Booking | Booking email: kkitschbandd@gmail.com | Decided |

## 3. Extras `[?]` (Charlie to decide later)

- Band member names and roles
- Press quotes
- Upcoming shows
- Downloadable press zip (hi res photos, logo, bio)
- Tech rider / stage plot

## 4. Layout (decided)

A **single compact scrolling page**. Structure is modeled on theglorioussons.com: wordmark logo on top, big hero image right under it, then a horizontal photo carousel with big images, then videos, then social links in the footer.

```
[ Logo, centered ]
[ Big hero band photo, full width ]
[ Listen: Spotify link button + Instagram / TikTok icons ]
[ Bio ]
[ Photos: horizontal carousel, big images, swipe/arrows ]
[ Watch: 3 to 5 YouTube clips ]
[ Booking: email ]
[ Footer: social links ]
```

Notes:
- Keep it compact: no tall empty sections, the carousel keeps 5 big photos in one row's height.
- Exact order of Listen / Bio / Photos / Watch can be adjusted once we see it in the browser.
- Nav: probably unnecessary for a page this short; revisit after the wireframe.

### Photo carousel

- **v1:** big images, one (or one and a peek of the next) visible at a time, scroll by swipe on phones and arrows on desktop.
- **Later:** slow automatic scrolling like the Glorious Sons site, pausing on hover or touch, and respecting the "reduce motion" accessibility setting.

## 5. Visual design

- **Vibe:** playful, retro, funk. Bold and punchy rather than muted.
- **Color palette (decided):** matches the logo, which is black, red, and yellow. The page uses dark grey instead of pure black. Colours below were sampled from the logo file.

| Role | Colour | Hex | Notes |
| --- | --- | --- | --- |
| Page background | Dark grey | `#1F1F1F` | Replaces the logo's black, so the black logo circle still stands out against the page |
| Raised surfaces (cards, carousel frame) | Lighter grey | `#2B2B2B` | Subtle separation between sections |
| Primary accent | Logo yellow | `#F8D400` | Headings, links, Spotify button; very readable on dark grey |
| Secondary accent | Logo red | `#F80000` | Borders, rings, dividers, hover states, buttons. Not for small body text (too low contrast on dark grey) |
| Body text | Warm off white | `#F5F1E6` | Easier on the eyes than pure white |

  Design motifs pulled from the logo: the red double ring and rounded, bubbly yellow outline lettering. Possible uses: red ring borders around section headings or photos, rounded corners everywhere, yellow outline style headings.
- **Typography:** retro, matched to the logo. **Heading font: Coiny. Body font: Nunito.** (Both decided, both free on Google Fonts.)
  - **What the logo font is:** a 1970s style heavy, rounded display sans. The letters are fat with fully rounded ends, the curves on `s` and `c` are squared off, the spacing is so tight the letters touch, and the ascenders on `k` and `h` are tall. It is drawn as a single outline, like a neon tube. It is close to 70s faces such as ITC Pump and Blippo, but probably not an exact match to any one font; it may have been custom drawn or traced.
  - **Heading font candidates** (all free on Google Fonts), compared side by side in `design-reference/font-candidates.html`: Coiny (closest match), Bagel Fat One, Titan One, Rammetto One, Chango, Lilita One, Sniglet, Righteous, Shrikhand, Monoton.
  - **Outline effect:** headings can echo the logo's outline style with a CSS text stroke (yellow outline, transparent fill), with solid yellow for smaller headings.
  - **Body text candidates:** Nunito, Fredoka, or Varela Round (rounded, friendly, easy to read).
- **Retro layout ideas** (to try in the wireframe):
  - Rounded corners everywhere, matching the logo's bubbly letterforms.
  - Red double ring borders (taken from the logo) framing the hero photo, photos, and video thumbnails.
  - Pill shaped yellow buttons with a hard offset drop shadow (a flat 70s poster look, not a soft blur).
  - Section headings in the outline style, maybe with a slight tilt or a red underline swoosh.
  - Thin horizontal stripe bands (red / yellow) as section dividers, a classic 70s motif.
  - Optional: subtle film grain or halftone texture on the dark grey background.
- **Light/dark:** one dark theme only (dark grey). No light mode.

## 6. Technical approach

- Plain static site: HTML, CSS, a little vanilla JavaScript. No framework, no build step, so it is fast, cheap to host, and easy to edit.
- Responsive, mobile first (most visitors tap through from Instagram/TikTok on phones).
- Images resized and compressed into web formats, lazy loaded.
- YouTube videos embedded via a lightweight "click to load" facade so the page stays fast.
- Social share preview (Open Graph image, title, description) so links look good in DMs and emails.
- Accessible: alt text, keyboard navigation, sufficient contrast (worth watching with a bright palette).
- Placeholders live in one obvious spot so swapping in real links and text later is a one line change each.

File structure:

```
/index.html
/css/styles.css
/js/main.js
/assets/images/       (web optimized photos)
/assets/logo/
/assets/press/        (downloadable hi res files, if we do the press zip)
/design-reference/    (inspiration only, not published)
  logo/               (original logo as received)
  colors/
  fonts/
```

## 7. Build process

1. **Decide** content, layout, and design (this doc).
2. **Gather assets** into the repo.
3. **Wireframe**: page structure with placeholder content; review in the browser.
4. **Style**: apply palette and fonts from the reference images; review on desktop and phone widths.
5. **Fill real content** as it arrives; optimize images.
6. **Polish**: accessibility, performance, share preview checks.
7. **Review round** with the band; iterate.
8. **Later features**: auto scrolling carousel.
9. **Deploy** (section 8).

Each step ends with a commit and a browser review before moving on.

## 8. Hosting and deployment (later)

To be decided after design. Likely candidates: GitHub Pages, Netlify, or Cloudflare Pages (all free for a static site), plus a custom domain `[?]`.
