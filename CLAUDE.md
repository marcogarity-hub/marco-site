# Marco's personal site

A one-page static site (Next.js, static export, deployed on Vercel). All content lives in `content/site.yaml`. The page layout is `app/page.tsx` and the styles are `app/globals.css`.

## When Marco asks to update the site

1. Edit only `content/site.yaml` unless he asks for a design change.
2. Run `npm run build`. It validates the YAML and fails with a line number if a house rule is broken. Fix and rebuild until it passes.
3. Show Marco the diff and wait for his OK before committing. Then commit with a short message saying what changed (for example "Now: add UBC hackathon result") and push. Vercel deploys on push.

## Now log rules

- Newest first. Keep 3 to 6 entries.
- `when` is a short label: "Nov 2026", "Summer 2026".
- One or two plain sentences each, present tense for ongoing work, past tense for finished work.
- When something finishes with a real result (a shipped link, a placement, a number Marco can defend), move it to `work` and drop it from `now`.
- Delete entries that have stopped being true rather than letting them go stale.

## House rules (non-negotiable)

- No em dashes anywhere. Use commas, colons, or a new sentence. The build enforces this.
- No phone number on the site. The build enforces this.
- Never invent facts, numbers, titles, or results. If a number is uncertain, leave it out and ask.
- Mosaic: no target company names, no countries tied to targets, no numeric thesis thresholds.
- MIV client: always "Detroit fintech startup." Never name it or its competitors.
- Projects built with AI coding tools: describe them as "designed, built, and shipped" or "built with Claude Code," matching the resume. Use only the titles on the resume.
- Keep wording consistent with his current resume so an interviewer sees the same story in both places.
