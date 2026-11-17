import fs from "node:fs";
import path from "node:path";
import { load as parseYaml } from "js-yaml";
import { z } from "zod";

const text = z.string().trim().min(1);

const Site = z.object({
  profile: z.object({
    name: text,
    headline: text,
    bio: z.array(text).min(1),
    location: text,
    email: z.string().email(),
    links: z.array(z.object({ label: text, href: z.string().url() })),
    resume: z.string().startsWith("/").optional(),
  }),
  now: z.array(z.object({ when: text, text: text })).min(1),
  work: z.array(
    z.object({
      title: text,
      when: text,
      status: z.enum(["Live", "In use", "In progress", "Archived"]),
      link: z.string().url().optional(),
      image: z.string().startsWith("/").optional(),
      summary: z.array(text).min(1),
      builtWith: z.array(text).default([]),
    }),
  ),
  experience: z.array(
    z.object({
      org: text,
      role: text,
      location: text,
      when: text,
      bullets: z.array(text).min(1),
    }),
  ),
  education: z.array(
    z.object({
      school: text,
      location: text,
      degree: text,
      when: text,
      details: z.array(text).default([]),
    }),
  ),
  skills: z.array(z.object({ label: text, items: z.array(text).min(1) })),
});

export type SiteContent = z.infer<typeof Site>;

// House rules that a schema can't express. Each returns a message or null.
const rules: Array<(raw: string) => string | null> = [
  (raw) => {
    const line = raw.split("\n").findIndex((l) => l.includes("—") && !l.trim().startsWith("#"));
    return line === -1 ? null : `Line ${line + 1} has an em dash. Use a comma, a colon, or a new sentence.`;
  },
  (raw) => {
    const phone = /\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/;
    const line = raw.split("\n").findIndex((l) => phone.test(l) && !l.trim().startsWith("#"));
    return line === -1 ? null : `Line ${line + 1} looks like a phone number. Keep phone numbers off the public site.`;
  },
];

export function getContent(): SiteContent {
  const file = path.join(process.cwd(), "content", "site.yaml");
  const raw = fs.readFileSync(file, "utf8");

  const problems = rules.map((rule) => rule(raw)).filter(Boolean) as string[];

  let data: unknown;
  try {
    data = parseYaml(raw);
  } catch (err) {
    throw new Error(`content/site.yaml is not valid YAML.\n${(err as Error).message}`);
  }

  const parsed = Site.safeParse(data);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      problems.push(`${issue.path.join(" > ") || "(top level)"}: ${issue.message}`);
    }
  }

  if (problems.length) {
    throw new Error(`content/site.yaml needs fixing before the site can build:\n- ${problems.join("\n- ")}`);
  }

  return parsed.data!;
}
