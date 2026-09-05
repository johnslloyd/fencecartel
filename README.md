# Fence Cartel

Personal brand site for Jesse Lloyd (Fence Cartel) — fence/gate content creator (YouTube, Instagram, TikTok) based in Olive Branch, MS. Plain HTML/CSS/JS, no build step, no framework.

## Structure

```
.
├── index.html         Home — hero, platform stats, latest content feed, dual CTA
├── work.html           Content library by category (Wood Gates, Bumpboard, Staining, etc.)
├── collab.html          Media kit + collab pitch form
├── quote.html            Fence-quote lead form
├── landing/                Affiliate "Gear" pages — index.html is the listing hub,
│                             each product roundup is its own file (see below)
├── css/styles.css        Single stylesheet, CSS custom properties for theme colors
├── js/main.js              Mobile nav toggle + form success handling
└── images/                Logo assets, hero photo, favicons
```

**Adding a new Gear roundup:** duplicate `landing/example-product.html`, fill in the real
content, then add a matching card to the grid in `landing/index.html` linking to it.

## Local development

No build step, no dependencies — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

If you edit `css/styles.css`, bump the `?v=N` query string on the stylesheet `<link>` in all four HTML files — the plain `http.server` doesn't send cache headers, so browsers can aggressively cache the old CSS otherwise.

## Deployment (Docker on a VPS) — auto-deploys on every push

Once set up, this requires **no terminal and no manual redeploy step, ever.** Pushing to
`master` (or asking Claude Code to do it) is the entire deploy process:

1. GitHub Actions (`.github/workflows/build-and-push.yml`) builds a fresh Docker image and
   publishes it to `ghcr.io/johnslloyd/fencecartel:latest` on every push to `master`.
2. A small `watchtower` container running alongside the site on the VPS checks that image
   once a minute. The moment a new one shows up, it pulls it and restarts the site
   automatically — no button, no SSH session, no compose command.

**One-time setup, on the VPS:**

```bash
git clone git@github.com:johnslloyd/fencecartel.git
cd fencecartel
docker compose -f docker-compose.prod.yml up -d
```

That's the last terminal command this project should ever need. From then on, adding
content and pushing it is the whole workflow — the live site catches up within about a
minute on its own.

**First-time-only extra step:** GitHub Container Registry packages built by Actions default
to *private*, even in a public repo. After the first push, go to the package's page on
GitHub (`github.com/johnslloyd?tab=packages`) → the `fencecartel` package → **Package
settings** → change visibility to **Public**. Otherwise Watchtower can't pull it. This is a
few clicks in a browser, not a terminal step.

**`docker-compose.yml` vs `docker-compose.prod.yml`:** the plain `docker-compose.yml`
(`build: .`) is for local development/testing only — it builds the image from whatever's on
disk. `docker-compose.prod.yml` is what the VPS actually runs — it pulls the pre-built image
from the registry and pairs it with Watchtower. Don't run both on the same machine at once
(same container name/port).

**Port mapping** — both compose files map host `8080` → container `80`, on the assumption
this VPS might run other sites behind a shared reverse proxy. Two ways to go from here:

- **Only site on the box:** change the mapping to `"80:80"` (and `"443:443"` once you add TLS).
- **Other sites already running:** leave it on `8080` and point your existing reverse proxy
  (nginx, Caddy, Traefik) at `127.0.0.1:8080` for this site's domain.

**HTTPS:** the site container only serves plain HTTP — it doesn't do TLS termination.
Easiest paths: put [Caddy](https://caddyserver.com/) in front (automatic Let's Encrypt certs
with a two-line Caddyfile), or run `certbot` against nginx directly if you're doing the
reverse-proxy-per-site setup.

**Forms:** `quote.html` and `collab.html` submit via [Web3Forms](https://web3forms.com/)
(a hosted form backend — needed because this is a static container with no server-side code
to receive submissions). Both forms email straight to `Lloyd08@aol.com`. To activate:

1. Go to [web3forms.com](https://web3forms.com/) and enter `Lloyd08@aol.com` to get a free
   access key emailed to that inbox.
2. Paste the key into `WEB3FORMS_ACCESS_KEY` near the top of the form-handling block in
   [js/main.js](js/main.js).
3. Redeploy.

Both forms also carry a hidden honeypot field (`botcheck`) — real visitors never see or fill
it, so any submission with it checked is silently dropped client-side before it reaches
Web3Forms, which filters it server-side too if it ever gets through.

## Known placeholders

- **Gear pages** — `landing/example-product.html` and the one card on `landing/index.html`
  are still placeholder content, pending real product picks from Jesse.
- **Face photo** — no clean face-forward shot of Jesse was found in his existing content;
  the hero photo is an action shot instead.
