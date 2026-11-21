# CYBER // RISHABH

Production-ready personal portfolio for **Rishabh Aggarwal** — BCA student, aspiring penetration tester, and full-stack developer.

> Think Like an Attacker. Build Like a Developer. Secure Like a Professional.

Built with React 19, Vite, Tailwind CSS v4, Framer Motion, and Lucide React.

---

## Quick start

```bash
npm install
npm run dev       # development server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run lint      # oxlint
```

Node 20+ is recommended.

---

## What is implemented

- Sticky, responsive navbar with active-section tracking, smooth scrolling, a keyboard-accessible mobile menu, Escape handling, and scroll locking.
- Hero with typing roles, profile card, custom avatar fallback, and a fully interactive terminal.
- Terminal commands: `help`, `about`, `skills`, `projects`, `labs`, `contact`, `clear`; command history with ↑ / ↓.
- About, categorized skills, featured FlareX project, clearly labelled future project slots.
- Security Labs with category filters, statuses, expandable methodology / findings / lessons, and authorization notes.
- Education & Certifications with only verifiable claims.
- Resume section that checks whether the PDF exists before enabling download.
- Contact form with validation, focus management, loading/success/error states, and honest "nothing was sent" behaviour when no backend is configured.
- Footer with dynamic year, navigation, configured social links only, and back-to-top.
- Custom 404 page, SEO metadata, Open Graph tags, JSON-LD, favicon, and `robots.txt`.
- Reduced-motion support, semantic landmarks, one `h1`, visible focus states, and skip link.

### Terminal safety

Terminal input is matched against a fixed registry of functions. There is no `eval`, no `Function`, no shell access, and no DOM injection. Unknown input is echoed as text with a "command not found" response.

---

## Central configuration

Everything personal lives in **`src/data/portfolio.js`**. Components read from it; do not hardcode personal data elsewhere.

| What | Field |
| --- | --- |
| Name, role, tagline, bio | `identity` |
| Email / GitHub / LinkedIn | `contact.email`, `contact.github`, `contact.linkedin` |
| Contact form endpoint | `contact.endpoint` |
| Profile image | `media.profileImage` |
| Resume PDF | `media.resume` |
| Education | `education` |
| Certifications | `certifications.earned`, `certifications.upcoming` |
| Skills & levels | `skills`, `skillLevels` |
| Projects (featured + future) | `projects` |
| Labs | `labs.entries` |
| Navigation | `nav` |
| Resume bullets | `resume.sections` |

Empty strings are intentional. The UI hides actions that depend on missing values rather than inventing them.

### Add the real profile photograph

1. Save your photo as **`public/images/profile.jpg`**.
2. Reload the site. No component change is needed.
3. If the file is missing or fails to load, the built-in initials avatar is shown automatically.

Recommended: square image, at least 600 × 600 px, optimized (under ~300 KB).

### Add GitHub, LinkedIn, and email

Edit `src/data/portfolio.js`:

```js
contact: {
  email: "you@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
  endpoint: "",
}
```

Only absolute `http(s)` URLs are rendered. Empty values produce no clickable buttons. All external links open with `rel="noopener noreferrer"`.

### Add the actual resume

1. Export your real resume as a PDF.
2. Save it as **`public/resume/rishabh-resume.pdf`**.
3. Reload. The section performs a `HEAD` request and verifies the `Content-Type` is PDF before enabling **Download PDF**.
4. Update `media.resumeFilename` if you want a different download filename.

No resume is generated, and no placeholder PDF is included.

### Enable the contact form

The form does **not** pretend to send when no endpoint is configured.

1. Create a backend endpoint — for example a Vercel serverless function, Formspree, or another privacy-conscious provider.
2. Set `contact.endpoint` in `src/data/portfolio.js` to an **HTTPS URL** (same-origin paths like `/api/contact` are also accepted; localhost HTTP is allowed for development).
3. The form will `POST` JSON:

```json
{
  "name": "Full name",
  "email": "visitor@example.com",
  "subject": "Subject",
  "message": "Message body",
  "website": ""
}
```

4. The endpoint must:
   - validate and length-limit all fields server-side,
   - reject requests where `website` is non-empty (honeypot),
   - apply rate limiting and abuse protection,
   - send mail through a transactional provider,
   - return a 2xx status only when the message was accepted.
5. Never place API secrets in `src/data/portfolio.js` or any frontend file. Keep them server-side.

Submissions are not stored in `localStorage`. The client includes a honeypot field, input length limits, and a 12-second request timeout.

---

## Folder structure

```
rishabh-portfolio/
├─ public/
│  ├─ images/                 # add profile.jpg here
│  ├─ resume/                 # add rishabh-resume.pdf here
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ components/
│  │  ├─ ContactForm.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ ProfileAvatar.jsx
│  │  ├─ ProjectCard.jsx
│  │  ├─ Reveal.jsx
│  │  ├─ ScrollToTop.jsx
│  │  ├─ SectionHeading.jsx
│  │  ├─ SkillCard.jsx
│  │  ├─ SocialLinks.jsx
│  │  ├─ Terminal.jsx
│  │  └─ icons.jsx
│  ├─ data/portfolio.js       # single source of truth
│  ├─ hooks/useResumeStatus.js
│  ├─ pages/Home.jsx
│  ├─ pages/NotFound.jsx
│  ├─ sections/               # Hero, About, Skills, Projects, SecurityLabs,
│  │                          # Certifications, Resume, Contact
│  ├─ utils/url.js
│  ├─ App.jsx
│  ├─ index.css               # Tailwind v4 theme + design system
│  └─ main.jsx
├─ index.html                 # metadata, fonts, JSON-LD
├─ vercel.json                # SPA rewrite + security headers
└─ vite.config.js
```

---

## Design system

| Token | Value |
| --- | --- |
| Background | `#080B0A` |
| Secondary background | `#101713` |
| Card | `#121A15` |
| Neon green | `#39FF88` |
| Emerald | `#16A34A` |
| Primary text | `#F5F7F5` |
| Muted text | `#9CA9A0` |
| Border | `#26352B` |

Defined as Tailwind v4 theme tokens in `src/index.css` (`bg-ink`, `text-neon`, `border-line`, etc.). Typography: Inter (UI) and JetBrains Mono (terminal/code labels), loaded from Google Fonts with system fallbacks.

---

## Verification performed

The following was actually executed on this codebase:

- `npm run build` — succeeded (Vite 8).
- `npm run lint` — zero errors (only test-script warnings while temporary verification files existed; removed afterwards).
- Production preview (`vite preview`) exercised with headless Chrome via Playwright:
  - **45/45 automated checks passed**, 0 console errors, 0 page errors.
  - Widths tested: **320, 375, 430, 768, 1024, 1366, 1920 px** — no horizontal overflow.
  - Terminal commands (`help`, `projects`, unknown input, script-like input, `clear`, history) verified.
  - Navbar active state, mobile menu open/close/Escape/navigation/scroll unlock verified.
  - Empty social buttons absent; profile fallback present.
  - Resume missing state and disabled download verified.
  - Contact required-field errors, focus management, honest unconfigured state, and no fake success verified.
  - 404 route, reduced-motion mode, single `h1`, all 8 section anchors verified.
- Visual screenshots captured at 375 px and 1366 px full-page.

Testing did not include real-device browsers or a formal screen-reader audit.

---

## Known limitations

- No public email, GitHub, or LinkedIn URL has been provided, so those actions are intentionally hidden.
- No real resume PDF is included; the download stays disabled until the file is added.
- No form backend is connected. The form reports this honestly and does not send or store data.
- The profile photograph is absent, so the custom initials avatar is shown.
- The 404 page renders client-side; static hosts return HTTP 200 for unknown paths.
- Google Fonts is the only third-party network request.
- No analytics or tracking is included.

---

## Deploy to Vercel

### Option A — dashboard

1. Push this folder to a Git repository.
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

`vercel.json` already provides the SPA rewrite and basic security headers.

### Option B — CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

### After deploying

1. Add `public/images/profile.jpg` and `public/resume/rishabh-resume.pdf` before the final deploy, or upload them and redeploy.
2. Fill in the social/email fields.
3. Connect the contact endpoint.
4. Update `index.html` metadata with your final domain and an Open Graph image if desired.
5. Redeploy.

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # http://localhost:5173
npm run build        # production build
npm run preview      # preview production build
npm run lint         # lint
```

---

© Rishabh Aggarwal. Personal portfolio.
