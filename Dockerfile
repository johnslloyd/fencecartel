FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy everything else in the repo (minus what .dockerignore excludes) as
# static site content. This avoids the old approach of listing every
# top-level file/folder by hand, which silently misses new pages/sections
# (that's exactly how the landing/ folder went missing from a deploy).
COPY . /usr/share/nginx/html/

EXPOSE 80
