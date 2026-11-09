# Tushar Arora: Portfolio

Frontend-only portfolio built with **Vite + React + TypeScript + Tailwind CSS**.
Builds to static files, so it deploys on Vercel with no configuration.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Edit content

All text (summary, skills, experience, projects, education, links) is in
[`src/data.ts`](src/data.ts). Wrap words in `**double asterisks**` to make them bold.

The resume buttons open the Google Drive link set as `resume` in `src/data.ts`.
Update your resume in Drive and the site always points to the latest one.

## Deploy

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com), choose **Add New, Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output `dist`). Click **Deploy**.

Every push to `main` redeploys automatically.
