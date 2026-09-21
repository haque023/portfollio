# MD Emdadul Haque: Portfolio

Personal portfolio for **MD Emdadul Haque**, Senior Software Engineer | AI Engineer.
A static, client-side React app that deploys to **GitHub Pages**. There is no backend.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · React Router · Lucide icons · ESLint · Prettier

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Start the dev server                            |
| `npm run build`   | Type-check, then produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally              |
| `npm run lint`    | ESLint (must pass; CI runs it)                  |
| `npm run format`  | Format everything with Prettier                 |

Copy `.env.example` to `.env` for local configuration (see [Environment variables](#environment-variables)).

---

## Updating portfolio content

All content lives in typed data files in `src/data/`. You should not need to touch components.

| File                        | Controls                                                          |
| --------------------------- | ----------------------------------------------------------------- |
| `profile.ts`                | Name, headline, tagline, contact details, About text, headline stats |
| `experience.ts`             | Work history (append a new object to add a role) and education    |
| `skills.ts`                 | Skill groups and self-assessed scores                             |
| `projects.ts`               | Featured projects and their detail pages                          |
| `certifications.ts`         | Certifications (empty by default) and the "Currently exploring" list |
| `github.ts`                 | Selected repositories shown in the GitHub section                 |
| `architecture.ts`           | The "How I Build AI Systems" diagram                              |
| `philosophy.ts`             | Engineering principles                                            |
| `site.ts`                   | Page title and meta description                                   |
| `navigation.ts`             | Section order and navbar items                                    |

Adding a project creates its detail page (`/projects/<id>`), its sitemap entry and its pre-rendered SEO page automatically.

### Honesty rules built into the data model

- **Project `status`** is one of `Production`, `MVP`, `Prototype`, `Research`, `Concept`, `Reference`. Only use `Production` for something actually running in production.
- **Project `results`** is empty unless a result is verified. The page then says no measured outcomes are published.
- **Skill scores** are labelled on the site as self-assessed, not certified.
- **Certifications** render nothing while the array is empty. Only add real credentials.
- Headline figures (`~2,000` users, `40–50s → <5s`, `4 + ~15` engineers) come from your master profile and are labelled approximate.

---

## Environment variables

Defined in `.env` locally or as **repository variables** on GitHub (they are public configuration, not secrets).

| Variable               | Purpose                                                              | Example                              |
| ---------------------- | -------------------------------------------------------------------- | ------------------------------------ |
| `VITE_SITE_URL`        | Public origin, for canonical URL, Open Graph, sitemap, robots, JSON-LD | `https://yourdomain.com`            |
| `VITE_BASE_PATH`       | Path the site is served from (default `/`)                           | `/` or `/REPOSITORY/`                |
| `VITE_GITHUB_USERNAME` | Enables GitHub buttons and the GitHub section                        | `yourusername`                       |
| `VITE_LINKEDIN_URL`    | Enables LinkedIn buttons                                             | `https://www.linkedin.com/in/you`    |

Values left empty (or still set to the `yourdomain.com` / `yourusername` / `yourprofile` placeholders) are treated as **unset**. The related links, canonical tags and sitemap are simply omitted, so a placeholder never ends up on the live site.

---

## CV download

Place your CV at:

```
public/cv/MD-Emdadul-Haque-CV.pdf
```

The **Download CV** button checks that the file exists. If it does not, the button becomes **Request CV** (an email link), so the site never links to a 404.

---

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` runs on every push to `main`: install → lint → build → deploy using the official Pages actions.

1. Push this project to a GitHub repository.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. **Settings → Secrets and variables → Actions → Variables**: add the variables from the table above.
4. `git push origin main`. The site publishes automatically.

If you set no variables, the workflow defaults to Scenario B below (`/REPOSITORY/` base path, `https://OWNER.github.io` site URL, and the repository owner as the GitHub username). Set the variables only to override that, for example when you add a custom domain.

### Scenario A: custom domain, or a `USERNAME.github.io` repository

```
VITE_BASE_PATH=/
VITE_SITE_URL=https://yourdomain.com     # or https://USERNAME.github.io
```

### Scenario B: project site at `https://USERNAME.github.io/REPOSITORY/`

```
VITE_BASE_PATH=/REPOSITORY/
VITE_SITE_URL=https://USERNAME.github.io
```

Routing, assets, canonical URLs and the sitemap all follow the base path. No code changes are needed.

### How routing works on GitHub Pages

The app uses clean URLs (`/projects/agentmesh`) rather than `#` routes. At build time it emits a real `projects/<id>/index.html` for every project (with route-specific title, description and canonical tag) plus a `404.html` fallback that renders the app's not-found page.

---

## Custom domain

1. **Replace the placeholder** in `public/CNAME` (`yourdomain.com`) with your real domain, e.g. `example.com`. Do not leave the placeholder.
2. In the repo: **Settings → Pages → Custom domain**, enter the domain and save.
3. At your DNS provider, add records for the apex domain:

   | Type  | Host | Value             |
   | ----- | ---- | ----------------- |
   | A     | `@`  | `185.199.108.153` |
   | A     | `@`  | `185.199.109.153` |
   | A     | `@`  | `185.199.110.153` |
   | A     | `@`  | `185.199.111.153` |

   Optionally add matching `AAAA` records (see GitHub's docs for the current IPv6 addresses).

4. For `www`, add a **CNAME** record: host `www`, value `USERNAME.github.io`. GitHub then serves both `https://yourdomain.com` and `https://www.yourdomain.com`, redirecting one to the other.
5. Wait for DNS to propagate, then tick **Enforce HTTPS** in Pages settings (GitHub provisions the certificate automatically).
6. Set `VITE_SITE_URL=https://yourdomain.com` and `VITE_BASE_PATH=/`.

Menu names and IP addresses vary by provider and can change, so confirm them in [GitHub's custom-domain documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

---

## SEO

Generated at build time from the same data files the UI uses (`plugins/seo.ts`):

- `<title>`, meta description, canonical URL, Open Graph and Twitter tags
- JSON-LD `Person` and `WebSite` (only facts present in the data files; phone number is deliberately excluded)
- `sitemap.xml` and `robots.txt` (require `VITE_SITE_URL`)
- `public/og-image.png` (1200×630) is used for social previews. Replace it with your own if you like.

---

## Project structure

```
src/
├── components/
│   ├── animations/   Reveal, FlowConnector, HeroBackground
│   ├── layout/       Layout, Footer
│   ├── navigation/   Navbar, ScrollManager
│   ├── sections/     Hero, About, Skills, Experience, Projects, ...
│   └── ui/           Button styles, Badge, Section, ArchitectureDiagram, ...
├── data/             ← all editable content
├── hooks/            useActiveSection, useScrolled, useCvAvailable, ...
├── lib/              env, structuredData, cn
├── pages/            HomePage, ProjectPage (lazy), NotFoundPage
└── types/            shared TypeScript types
plugins/seo.ts        build-time SEO, sitemap, robots, per-project pages
```

## Accessibility and performance notes

- Skip link, semantic landmarks, one `h1` per page, visible focus states, `aria-current` on the active nav item, and an accessible mobile menu (Escape closes and returns focus).
- `prefers-reduced-motion` disables decorative motion (CSS keyframes, Framer Motion via `MotionConfig`, reveal effects).
- Framer Motion loads through `LazyMotion` (DOM features only); the project detail pages are code-split; fonts are self-hosted (no third-party requests); no analytics or third-party scripts.
- The GitHub section uses hand-maintained data, so the client makes no GitHub API calls.

## Security

No secrets in source, no `dangerouslySetInnerHTML`, external links use `rel="noopener noreferrer"`, and there is no contact form (so nothing collects data). If you later add a form service, analytics, or embeds, document what data they receive.
