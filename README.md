# JDT Inc. — Agency Website

A custom marketing site for **JDT Inc.**, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and a light touch of Framer Motion. Designed to look premium, load fast, and be easy to edit.

---

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (subtle entrance animations only)
- Inter + Instrument Serif via `next/font`

No database. No CMS. No auth. Fully static-friendly and ready for Vercel.

---

## Run locally

Requirements: **Node.js 18.17+** (20+ recommended).

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Other commands

```bash
npm run build   # Production build
npm run start   # Start the production server locally
npm run lint    # ESLint
```

---

## Project structure

```
app/
  layout.tsx          Root layout, fonts, global metadata
  page.tsx            Home
  globals.css         Global styles + utility classes
  about/page.tsx
  services/page.tsx
  work/page.tsx
  work/[slug]/page.tsx   Case study detail (statically generated)
  contact/page.tsx
  not-found.tsx

components/
  Navbar.tsx          Fixed top nav with mobile drawer
  Footer.tsx          Dark footer with nav + CTA
  Section.tsx         Reusable section container (light / dark)
  CTA.tsx             Reusable call-to-action block
  CaseStudyCard.tsx   Premium case study card with metrics
  ServiceCard.tsx     Service grid item
  ContactForm.tsx     Frontend-only contact form
  Button.tsx          Reusable button (link or button)

lib/
  site.ts             Brand info, nav, socials, email
  services.ts         Services data model + list
  caseStudies.ts      Case studies data model + list
  cn.ts               className helper
```

---

## Editing content

Almost all copy and content lives in three places — you shouldn't need to touch JSX for most changes:

- **Brand + nav + email + socials** → `lib/site.ts`
- **Services** → `lib/services.ts`
- **Case studies** → `lib/caseStudies.ts` (each entry auto-generates a `/work/<slug>` page)

Page-level copy lives directly inside `app/<page>/page.tsx`.

### Add a new case study

1. Open `lib/caseStudies.ts`
2. Add a new object to the `caseStudies` array with a unique `slug`
3. That's it — the detail page, routing, and static build output are handled automatically

### Change colors / typography

- Colors + fonts: `tailwind.config.ts`
- Global custom classes (`.display`, `.eyebrow`, `.link-underline`): `app/globals.css`

---

## Contact form

`components/ContactForm.tsx` is frontend-only right now — it simulates a submit. Three easy ways to make it real:

**Option 1: Formspree (simplest, no code)**
Replace the `onSubmit` body with a `fetch("https://formspree.io/f/<your-id>", { method: "POST", body: formData })`.

**Option 2: Resend (send yourself an email)**
1. `npm install resend`
2. Create `app/api/contact/route.ts` with a POST handler that calls the Resend SDK
3. Change `onSubmit` to `fetch("/api/contact", { ... })`
4. Add `RESEND_API_KEY` to your Vercel env

**Option 3: Calendly / booking only**
Delete the form and point the CTA at your Calendly link (see `app/contact/page.tsx`, the `#book` section — replace `href="#"` with your Calendly URL).

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects Next.js — no configuration needed
4. Click **Deploy**
5. Add your custom domain in **Project → Settings → Domains**

### Environment variables

None required out of the box. If you wire up Resend, add `RESEND_API_KEY`.

### Custom metadata

Edit `lib/site.ts` and `app/layout.tsx`. The metadata uses `metadataBase: new URL(site.url)` — update `site.url` once you have your domain.

---

## Design notes

- Black & white base, editorial serif display (Instrument Serif) + Inter body
- Generous padding (`py-24 sm:py-32`) for editorial rhythm
- Hairline borders (`border-black/10`) rather than heavy cards
- Motion is intentionally restrained — only on section entrances and hover
- All pages fully responsive from ~375px up

---

## License

© JDT Inc. All rights reserved.
