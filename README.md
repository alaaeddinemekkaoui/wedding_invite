# Ghita × Walid — Luxury Wedding Invitation

A cinematic, luxury static wedding invitation microsite built with **React + Vite + Tailwind CSS + Framer Motion**.

## Features

- Full dark / light mode (auto-detects system preference, persists in localStorage)
- Animated preloader, scroll progress bar, and section reveals
- Live countdown to the wedding day
- Stylised venue map card with Google Maps link
- Elegant welcome message section
- Fully responsive — mobile, tablet, desktop
- All content editable from a single config file: `src/data/config.js`
- Zero backend — fully static, deployable on Vercel or GitHub Pages

---

## Quick start (local development)

```bash
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/)

---

## Customise content

Edit **`src/data/config.js`** — everything (names, date, venue, nav links, welcome text, map link, and event details) lives there. No other file needs to change to adapt this for a different couple.

---

## Build for production

```bash
npm run build
```

Output is placed in `dist/`.

---

## Which deployment is better?

For **this app**, **Vercel is the better option**.

### Why Vercel is better here

- easiest deployment flow
- no repository subfolder/base-path headaches
- automatic HTTPS
- instant preview deployments on every push
- better custom domain experience

### When GitHub Pages is still a good choice

Use GitHub Pages if you want:

- the simplest free hosting tied directly to a GitHub repo
- no extra platform account beyond GitHub
- a basic static deployment that rarely changes

---

## Deploy to Vercel (recommended)

### Option 1: Dashboard import

1. Push this project to GitHub.
2. Go to Vercel.
3. Click **Add New → Project**.
4. Import your GitHub repository.
5. Framework preset: **Vite**.
6. Build command: `npm run build`
7. Output directory: `dist`
8. Deploy.

No extra config is required for Vercel.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and deploy.

---

## Deploy to GitHub Pages

### 1. Create a GitHub repository

Create a repository on GitHub (e.g. `wedding_invite`).

### 2. Build with the repository base path

This project already supports a configurable base path. Build it with your repository name:

```bash
# PowerShell
$env:VITE_BASE_PATH="/your-repo-name/"
npm run build
```

Or in Command Prompt:

```bat
set VITE_BASE_PATH=/your-repo-name/
npm run build
```

### 3. Push code

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/your-repo-name.git
git push -u origin main
```

### 4. Deploy the `dist` folder

You can deploy the built `dist` folder using a tool like `gh-pages`, or publish it from a GitHub Actions workflow.

Example using `gh-pages`:

```bash
npm install --save-dev gh-pages
```

Add these two scripts to `package.json`:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

Then run:

```bash
npm run deploy
```

### 5. Enable GitHub Pages

In your repository go to **Settings → Pages**, set the source to the **`gh-pages` branch**, root folder. Your site will be live at:

```
https://YOUR_USERNAME.github.io/your-repo-name/
```

---

## Project structure

```
src/
├── App.jsx                    Main app shell
├── main.jsx                   Entry point
├── index.css                  Global styles & CSS variables (theming)
├── data/
│   └── config.js              ← Edit all content here
├── hooks/
│   ├── useTheme.js            Dark/light mode logic
│   └── useCountdown.js        Live countdown timer
└── components/
    ├── Preloader.jsx
    ├── ScrollProgress.jsx
    ├── Navbar.jsx
    ├── ThemeToggle.jsx
    ├── HeroSection.jsx
    ├── CoupleSection.jsx
    ├── DetailsSection.jsx
    ├── CountdownSection.jsx
    ├── LocationSection.jsx
  ├── WelcomeMessage.jsx
    ├── FooterSection.jsx
    ├── DecorativeDivider.jsx
    └── MusicToggle.jsx
```
