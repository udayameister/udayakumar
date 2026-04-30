# Udayakumar P Academic Portfolio

React, Tailwind CSS, and Framer Motion portfolio site generated from CV-sourced JSON data.

## Local Development

```bash
cd portfolio-site
npm install
npm run dev
```

Open `http://localhost:5173` in the browser. Do not open `dist/index.html` directly while developing; use `npm run dev` or `npm run preview` so the JavaScript app is served correctly.

## Project Structure

```text
portfolio-site/
  public/
    Curriculum_Vitae_Udaya.pdf
  src/
    components/
    content/blog/
    data/profile.json
    utils/
```

## Updating Website Content

Most portfolio content lives in `src/data/profile.json`. Update publications, experience, skills, awards, certifications, projects, links, and Scholar metrics there instead of editing React components.

To add a personal photo, copy your image into `public/`, for example:

```text
public/profile-photo.jpg
```

Then update `src/data/profile.json`:

```json
"photoPath": "/profile-photo.jpg"
```

Blog posts live in `src/content/blog/*.md`. Add a Markdown file with front matter:

```md
---
title: "Research Update Title"
date: "2026-04-29"
summary: "Short summary."
tags: ["AI", "Neuroimaging"]
---

Write the update here.
```

The Admin page at `/admin` lets you test JSON edits in the browser, stores draft changes in localStorage, and exports an updated `profile.json` file for replacing `src/data/profile.json`.

## Admin Login

The `/admin` route is protected by a simple client-side login gate. Create a `.env` file from `.env.example` and change the password before running or deploying:

```bash
cp .env.example .env
```

```env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your-strong-password
```

For local development, restart the dev server after changing `.env`. Because this is a static React site, these credentials are a basic access gate, not a replacement for server-side authentication.

## Git Workflow

```bash
git init
git checkout -b dev
git add .
git commit -m "Create academic portfolio website"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin dev
```

Open a pull request from `dev` to `main` for reviewed updates. For small content changes:

```bash
git checkout dev
git pull
git add src/data/profile.json src/content/blog
git commit -m "Update portfolio content"
git push
```

## Deployment

### Vercel

1. Import the GitHub repository in Vercel.
2. Set framework preset to Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Vercel redeploys on every push to `main`.

### GitHub Pages

Install the Pages action or deploy `dist` from CI. A typical workflow builds with `npm ci && npm run build` and publishes the `dist` folder.

## Content Boundaries

The current content uses only details available in the supplied CV. GitHub, LinkedIn, Google Scholar URL, and citation metrics are supported in the data model but left blank because they were not present in the CV text.
