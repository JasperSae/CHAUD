# CHAUD static HTML rebuild

This is a clean, framework-free starting point based on the supplied Wix screenshots and CHAUD brand guide.

## Run it

Open `index.html` directly, or serve the folder locally with any static web server.

For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Before publishing

1. Copy your licensed `TT Commons Regular.otf` into `assets/fonts/`.
2. Replace every `https://forms.google.com/` ticket link with your actual Google Form URL.
3. Replace the placeholder image blocks with your final images.
4. Replace placeholder copy, partner names, social links, contact address, privacy and terms links.
5. If you want a fully offline site, download/host Plus Jakarta Sans yourself instead of the Google Fonts link in `index.html`.

## Useful places to edit

- Brand colors: `css/style.css` → `:root`
- Navigation: `index.html` → `<header class="site-header">`
- Section content: `index.html`
- Responsive layout: media queries at the bottom of `css/style.css`
- Mobile menu: `js/main.js`

The site intentionally uses plain HTML, CSS and a tiny amount of JavaScript so it stays easy to maintain.
