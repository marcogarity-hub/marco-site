# marco-site

Marco Garity's personal site. One page, all content in `content/site.yaml`.

Hosted on Vercel. Every push to `main` rebuilds and deploys the site in about a minute.

## Update it (under 5 minutes)

Either:

- **On GitHub:** open `content/site.yaml`, click the pencil, edit, and commit. The site updates in about a minute.
- **With Claude Code:** clone this repo, open the folder, and say what changed, for example "add the hackathon result to Now." `CLAUDE.md` tells it the rules.

If an edit breaks something, Vercel's build fails with a message naming the line, and the previous version stays live. Check the deployment in Vercel if your change doesn't show up.

## Custom domain (optional)

Buy `marcogarity.com` from any registrar (about $10 to $15 a year), then add it in the Vercel project under Settings, then Domains, and follow the DNS steps it shows.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # what Vercel runs; also validates site.yaml
```

## Add a screenshot to a project

Put the image in `public/` (for example `public/wellness.png`) and add `image: /wellness.png` to that project in `site.yaml`.
