# Ghita × Walid — Luxury Wedding Invitation

A cinematic, luxury static wedding invitation microsite built with **React + Vite + Tailwind CSS + Framer Motion**.

## Features

- Full dark / light mode (auto-detects system preference, persists in localStorage)
- Animated preloader, scroll progress bar, and section reveals
- Live countdown to the wedding day
- Elegant gallery with hover effects
- Stylised venue map card with Google Maps link
- Fully responsive — mobile, tablet, desktop
- All content editable from a single config file: `src/data/config.js`
- Zero backend — fully static, GitHub Pages ready

---

## Quick start (local development)

```bash
npm install
npm run dev
```

Open [http://localhost:5173/wedding_invite/](http://localhost:5173/wedding_invite/)

---

## Customise content

Edit **`src/data/config.js`** — everything (names, date, venue, nav links, text, map link, gallery items) lives there. No other file needs to change to adapt this for a different couple.

---

## Build for production

```bash
npm run build
```

Output is placed in `dist/`.

---

## Deploy to GitHub Pages

### 1. Create a GitHub repository

Create a repository on GitHub (e.g. `wedding_invite`).

### 2. Set the base path

Open `vite.config.js` and set `base` to match **your exact repository name**:

```js
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',   // ← change this
})
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

### 4. Deploy with gh-pages

Install the deploy helper:

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
    ├── GallerySection.jsx
    ├── FooterSection.jsx
    ├── DecorativeDivider.jsx
    └── MusicToggle.jsx
```
