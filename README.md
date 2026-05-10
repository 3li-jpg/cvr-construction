# CVR Construction Website

This repository contains the official marketing website for **CVR Construction Ltd.**, a Victoria, BC construction and renovation company. The site is designed to present the company as a premium, trustworthy local contractor for kitchen remodeling, bathroom renovations, full-home remodeling, commercial upgrades, tile and flooring work, fixture installation, and custom spaces.

The website is both a public-facing sales tool and an SEO asset. It explains what CVR Construction does, shows completed work, gives potential clients a clear path to contact the company, and provides search engines with structured information about the business, projects, service areas, and content.

## Live website

```text
https://www.cvrconstruction.ca
```

## GitHub repository

```text
https://github.com/3li-jpg/cvr-construction
```

## What this website is for

The site has four main goals:

1. **Generate qualified renovation leads**
   - Encourage visitors to contact CVR Construction about upcoming renovation or construction projects.
   - Make the company phone number, email, address, and contact form easy to find.
   - Support both residential and commercial inquiries.

2. **Build trust with local clients**
   - Present CVR Construction as an experienced Victoria, BC contractor.
   - Show real project imagery and case studies.
   - Explain the company process, service quality, and attention to detail.

3. **Improve search visibility**
   - Target searches around Victoria construction, kitchen renovation, bathroom renovation, home remodeling, and related services.
   - Provide structured metadata, sitemap support, robots directives, and schema markup.
   - Keep project and journal pages indexable so Google can discover more site content.

4. **Showcase project quality**
   - Use project pages, image galleries, and before/after sections to demonstrate the standard of work.
   - Highlight kitchens, bathrooms, decks, studios, commercial upgrades, cabins, and custom renovation details.

## Core pages

| Route | Description |
| --- | --- |
| `/` | Homepage introducing CVR Construction, services, process, project highlights, and calls to action. |
| `/showroom` | Kitchen and bath showroom page for fixtures, finishes, and showroom-related client interest. |
| `/about` | Company background, trust-building content, values, process, and business information. |
| `/projects` | Index of completed project case studies. |
| `/projects/[slug]` | Individual project pages with project details, images, scope, highlights, outcomes, and related work. |
| `/journals` | Renovation advice and educational content for prospective clients. |
| `/journals/[slug]` | Individual journal articles with long-form renovation guidance. |
| `/gallery` | Visual gallery of project photography. |
| `/contact` | Contact page with business details and inquiry path. |
| `/docs/api` | Public documentation for discovery endpoints and agent-facing information. |
| `/sitemap.xml` | XML sitemap generated for search engines. |
| `/robots.txt` | Search crawler and content usage directives. |

## Main features

- Responsive marketing site built with the Next.js App Router.
- Project case studies generated from shared site data.
- Journal/article pages generated from shared content data.
- Image-heavy gallery and project presentation.
- Business contact details reused across the site.
- Search-optimized page metadata.
- Open Graph and Twitter card metadata for social sharing.
- Local business structured data.
- Breadcrumb structured data on project and journal detail pages.
- Dynamic XML sitemap.
- `robots.txt` with a sitemap directive.
- Public `.well-known` discovery endpoints for agent and API discovery.
- Static image assets stored in `public/images`.

## Tech stack

- **Framework:** Next.js 16 with App Router
- **UI:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animation / motion:** Motion and related UI utilities
- **Icons:** Lucide React
- **Linting:** ESLint
- **SEO:** Next.js Metadata API, sitemap route, robots file, and structured data
- **Package manager:** npm

## Requirements

Use Node.js 20 or newer.

```bash
node --version
```

Install dependencies with:

```bash
npm install
```

## Local development

Start the local development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Scripts

### Development

```bash
npm run dev
```

Starts the local Next.js development server.

### Production build

```bash
npm run build
```

Creates a production build of the website.

### Start production server

```bash
npm run start
```

Runs the production build locally. Run `npm run build` first.

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

### Type check

```bash
npm run typecheck
```

Generates Next.js route types and runs TypeScript with `tsc --noEmit`.

### Full check

```bash
npm run check
```

Runs linting, type checking, and a production build. This is the best command to run before deploying or pushing larger changes.

## Project structure

```text
src/
  app/
    about/
    contact/
    docs/
    gallery/
    journals/
    projects/
    showroom/
    sitemap.ts
    layout.tsx
    page.tsx
  components/
  lib/
public/
  images/
  images/pearl/
  robots.txt
```

### Important directories and files

| Path | Purpose |
| --- | --- |
| `src/app` | Next.js App Router pages, layouts, and route handlers. |
| `src/app/layout.tsx` | Global layout, global metadata, business schema, fonts, and shared wrappers. |
| `src/app/page.tsx` | Homepage. |
| `src/app/sitemap.ts` | Dynamic sitemap route for `/sitemap.xml`. |
| `src/components` | Reusable UI components such as navigation, footer, gallery, buttons, page sections, and animations. |
| `src/lib/site-data.ts` | Main source of reusable business, service, project, journal, and navigation data. |
| `src/lib/metadata.ts` | Shared metadata helper logic. |
| `public/images` | Main public image assets. |
| `public/images/pearl` | Pearl plumbing and showroom-related product images. |
| `public/robots.txt` | Search crawler rules and sitemap declaration. |

## Content model

The site is mostly data-driven. Instead of hardcoding every project or article directly into page components, important content is stored in shared data files and then rendered by pages.

The main content file is:

```text
src/lib/site-data.ts
```

It includes:

- Navigation items
- Business contact details
- Service descriptions
- Process steps
- Project case study data
- Journal/article data
- Image references
- Project slugs and article slugs

This makes it easier to update core site content without rewriting page layouts.

## Updating business information

Business contact details are stored in `src/lib/site-data.ts`.

Typical fields include:

- Business name
- Address
- Phone number
- Email address
- WhatsApp link
- Google Maps link

When business contact details change, update the shared data first so the correct information appears consistently across the site.

## Adding or editing projects

Project pages are generated from the `projects` array in:

```text
src/lib/site-data.ts
```

Each project generally includes:

- `slug`
- `title`
- `year`
- `updatedAt`
- `category`
- `location`
- `summary`
- `intro`
- `heroImage`
- `coverImage`
- `galleryImages`
- `scope`
- `highlights`
- `outcome`
- `storySections`
- Optional before/after images

The `slug` controls the public URL:

```text
/projects/example-project-slug
```

After adding a project, the sitemap will automatically include it because `src/app/sitemap.ts` reads from the same project data.

## Adding or editing journal posts

Journal pages are generated from the `journalPosts` data in:

```text
src/lib/site-data.ts
```

Each journal post generally includes:

- `slug`
- `title`
- `description`
- `excerpt`
- `publishedAt`
- `date`
- `readingTime`
- `heroImage`
- `keyTakeaways`
- `sections`

The `slug` controls the public URL:

```text
/journals/example-article-slug
```

After adding a journal post, the sitemap will automatically include it.

## Images and media

Static images live in:

```text
public/images
```

Pearl/showroom product imagery lives in:

```text
public/images/pearl
```

When referencing public images in code or site data, use root-relative paths like:

```text
/images/example-image.webp
/images/pearl/example-product.webp
```

For best performance, prefer optimized `.webp` images when possible.

## SEO setup

The site includes several SEO features:

- Global metadata in `src/app/layout.tsx`
- Page-specific metadata on important routes
- Canonical URLs
- Open Graph metadata
- Twitter card metadata
- Local business schema
- Project schema
- Blog/article schema
- Breadcrumb schema
- XML sitemap
- Robots file
- Google site verification metadata

## Sitemap

The sitemap is generated dynamically from:

```text
src/app/sitemap.ts
```

The public sitemap URL is:

```text
https://www.cvrconstruction.ca/sitemap.xml
```

For Google Search Console, if the property already shows this prefix:

```text
https://www.cvrconstruction.ca/
```

submit only:

```text
sitemap.xml
```

The robots file also points crawlers to the sitemap:

```text
public/robots.txt
```

Current sitemap directive:

```text
Sitemap: https://www.cvrconstruction.ca/sitemap.xml
```

## Robots and indexing

The public robots file is:

```text
public/robots.txt
```

It allows normal crawling and includes the sitemap location. The global Next.js metadata also allows indexing and following by default.

## Agent and discovery endpoints

The site includes public discovery-related routes for agents and automated systems, including:

```text
/.well-known/api-catalog
/.well-known/agent-skills/index.json
/docs/api
/api/health
```

The `/docs/api` page explains these endpoints publicly.

## Deployment

This is a standard Next.js application. A typical production deployment should run:

```bash
npm install
npm run build
```

Use Node.js 20 or newer in production.

After deployment, verify:

```text
https://www.cvrconstruction.ca
https://www.cvrconstruction.ca/sitemap.xml
https://www.cvrconstruction.ca/robots.txt
https://www.cvrconstruction.ca/contact
```

## Pre-push checklist

Before pushing important changes, run:

```bash
npm run check
```

Also manually review:

- Homepage loads correctly.
- Navigation links work.
- Contact information is correct.
- Project pages render correctly.
- Journal pages render correctly.
- Images are not broken.
- Sitemap loads at `/sitemap.xml`.
- Robots file loads at `/robots.txt`.

## Common maintenance tasks

### Update phone, email, or address

Edit:

```text
src/lib/site-data.ts
```

### Add a project

Edit the `projects` array in:

```text
src/lib/site-data.ts
```

Add any new project images to:

```text
public/images
```

### Add a journal article

Edit the `journalPosts` data in:

```text
src/lib/site-data.ts
```

### Update SEO wording

Check:

```text
src/app/layout.tsx
src/lib/metadata.ts
```

Also review any page-specific `generateMetadata` functions.

### Update sitemap behavior

Edit:

```text
src/app/sitemap.ts
```

## License and ownership

This project is private and maintained for **CVR Construction Ltd.**

All website copy, branding, project data, and imagery are intended for CVR Construction's business use.
