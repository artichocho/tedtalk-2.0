# TEDx Satire Website (Symfony + GitHub Pages)

This repository contains a Symfony project (`app/`) that renders a polished satirical TED-style website and exports it as static files for GitHub Pages.

## What this gives you

- Symfony + Twig structure for clean templating
- Tailwind CSS (via CDN) for a modern professional look
- French-only website (`/`)
- Multi-page site: accueil, intervenante, programme, billetterie, statistiques, à propos, espace VIP
- Multiple easter eggs (`Shift + T`, Konami code, secret VIP page)
- Interactive charts with invented demo data
- Automated deployment to GitHub Pages via GitHub Actions

## Local usage

```bash
cd app
composer install
symfony server:start
```

Open `http://127.0.0.1:8000`.

French is the default landing version.

## Export static files

```bash
cd app
composer export-static
```

Static output is generated in `app/docs/`.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml`:

1. installs dependencies
2. runs `composer export-static`
3. deploys `app/docs` to GitHub Pages

Enable Pages in your repository settings using **GitHub Actions** as the source.

## Customize content

- Templates: `app/templates/talk/`
- Easter eggs/interactions: `app/public/assets/site.js`
- Routes/content logic: `app/src/Controller/TalkController.php`
- Static export command: `app/src/Command/ExportStaticSiteCommand.php`
