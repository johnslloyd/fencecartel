# Fence Cartel

Personal brand site for Jesse Lloyd (Fence Cartel) — fence/gate content creator (YouTube, Instagram, TikTok) based in Olive Branch, MS. Plain HTML/CSS/JS, no build step, no framework.

## Structure

```
.
├── index.html         Home — hero, platform stats, latest content feed, dual CTA
├── work.html           Content library by category (Wood Gates, Bumpboard, Staining, etc.)
├── collab.html          Media kit + collab pitch form
├── quote.html            Fence-quote lead form
├── css/styles.css        Single stylesheet, CSS custom properties for theme colors
├── js/main.js              Mobile nav toggle + form success handling
└── images/                Logo assets, hero photo, favicons
```

## Local development

No build step, no dependencies — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

If you edit `css/styles.css`, bump the `?v=N` query string on the stylesheet `<link>` in all four HTML files — the plain `http.server` doesn't send cache headers, so browsers can aggressively cache the old CSS otherwise.

## Deployment (Docker on a VPS)

The repo includes a `Dockerfile`, `nginx.conf`, and `docker-compose.yml` — nginx serving the static files, nothing else running.

**On the VPS:**

```bash
git clone <this-repo-url>
cd FenceCartel
docker compose up -d --build
```

That starts the site on `http://<vps-ip>:8080`. To update after a change:

```bash
git pull
docker compose up -d --build
```

**Port mapping** — `docker-compose.yml` maps host `8080` → container `80` by default, on the assumption this VPS might run other sites behind a shared reverse proxy. Two ways to go from here:

- **Only site on the box:** change the mapping to `"80:80"` (and `"443:443"` once you add TLS) in `docker-compose.yml` and point DNS straight at it.
- **Other sites already running:** leave it on `8080` and point your existing reverse proxy (nginx, Caddy, Traefik) at `127.0.0.1:8080` for this site's domain.

**HTTPS:** this container only serves plain HTTP — it doesn't do TLS termination. Easiest paths: put [Caddy](https://caddyserver.com/) in front (automatic Let's Encrypt certs with a two-line Caddyfile), or run `certbot` against nginx directly if you're doing the reverse-proxy-per-site setup.

**Forms:** `quote.html` and `collab.html` currently only fake a success message client-side — nothing is actually sent anywhere yet. Before relying on them for real leads, wire them to a form backend (e.g. [Formspree](https://formspree.io/)) since this is a static container with no server-side code to receive submissions.

## Known placeholders

- **TikTok feed** — only one real video is embedded; the other two slots on the homepage are "More on TikTok" placeholders (TikTok's video API blocked automated scraping when this was built — send over more video links to fill them in).
- **Face photo** — no clean face-forward shot of Jesse was found in his existing content; the hero photo is an action shot instead.
- **Unused images** — `images/hero-bg.jpg` (old hero photo) and `images/hero-bg-1.png` (a large duplicate of the current hero upload) are no longer referenced and can be deleted.
