# Lloyd Exteriors Website

A plain HTML/CSS/JS rebuild of the [Framer site](https://lloydexteriors.framer.website/) for Lloyd Exteriors, a fence, gate, and staining contractor in Memphis, TN. Built to be opened and continued in **Claude Code**.

## Structure

```
.
├── index.html        Home page (hero, services, value props, testimonials, CTA)
├── gallery.html       Full project gallery page
├── css/styles.css     All styles (single stylesheet, CSS custom properties for theme colors)
├── js/main.js          Mobile nav toggle + small enhancements
└── images/            Drop real project photos here
```

No build step, no dependencies — open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What still needs real content

Everything below is a placeholder pulled from the original Framer site and needs to be swapped for the real thing:

- **Photos** — the diagonal-striped boxes on the home page and gallery are stand-ins for real project photos (gates, fences, staining work). Drop images into `images/` and swap the `.placeholder-img` divs for `<img>` tags.
- **Testimonials** — replace the three `[PLACEHOLDER TESTIMONIAL]` quotes on the home page with real customer reviews.
- **Phone number** — `901-555-5555` is a placeholder throughout (header, hero, footer, `tel:` links). Swap for the real number.
- **Social links** — YouTube is linked to `@fenceguy689`; confirm/update the handle and add other platforms (Instagram, TikTok, etc.) as needed.
- **Copy** — headlines and body copy are close to the original site's structure but can be refined once real photos and testimonials are in.

## Next steps with Claude Code

Open this folder in Claude Code and ask it to:
1. Swap in real photos and testimonials.
2. Add a contact form or additional pages (About, Service Areas, Blog for content strategy).
3. Set up deployment (e.g. GitHub Pages, Netlify, or Vercel).
