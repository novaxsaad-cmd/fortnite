# fncheats.net

Static Fortnite cheats site for Cloudflare.

## Cloudflare Pages (recommended)

In the Pages project settings:

- Framework preset: `None`
- Build command: leave empty
- Build output directory: `/`
- Root directory: `/`
- Deploy command: leave empty (do not use `npx wrangler deploy`)

## If your project runs `npx wrangler deploy`

`wrangler.toml` is configured with `[assets] directory = "."` so that command publishes the static site.
