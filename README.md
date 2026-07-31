> **Note** This demo store is built on Hydrogen v2. If you are using a store built with the now deprecated Hydrogen 1, please see [here](https://github.com/okendo/okendo-shopify-hydrogen-demo/tree/hydrogen-1-archive).

> **Note**: there have been multiple versions of Shopify's Hydrogen demo store. If your project is based on an old version of it, consult the history of this repository.

# Demo store for Okendo's Hydrogen (React Router) components

## Requirements

- Node.js (LTS recommended)
- npm or Yarn
- A Shopify Storefront API token / Hydrogen-compatible environment for full store operation (optional for UI development)

## Start the demo store locally

1. Install dependencies:

```bash
npm install
# or
# yarn install
```

2. Configure environment variables (create a `.env` file at project root):

```env
# Example
SHOPIFY_STOREFRONT_TOKEN=your_storefront_token
PUBLIC_STORE_DOMAIN=your-shop.myshopify.com
# see Hydrogen docs for full list
```

3. Start the development server:

```bash
npm run dev
# or
# yarn dev
```

4. Open the site at `http://localhost:3000`.

## Notes

- If you need to push changes to GitHub, set your remote and push (see project maintainer instructions).
- This repository has been adapted from the Hydrogen demo; consult the `app/routes` and `app/components` folders to locate pages and components.

---

Instructions en français — commandes principales pour démarrer le projet :

1. Installer les dépendances :

```bash
npm install
```

2. Créer le fichier `.env` et ajouter les variables nécessaires (voir ci‑dessus).

3. Démarrer le serveur de dev :

```bash
npm run dev
```

4. Ouvrir `http://localhost:3000` dans votre navigateur.

Si vous voulez que je pousse ces changements vers GitHub, dites-moi quelle identité Git (nom et email) utiliser ou répondez `use placeholders`.
# Hydrogen template: Demo Store

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **full-featured setup** of components, queries and tooling to get started with Hydrogen. It is deployed at [hydrogen.shop](https://hydrogen.shop)

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- Shopify Hydrogen headless extension
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Tailwind CSS (via PostCSS)
- Full-featured setup of components and routes

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher

```bash
npm create @shopify/hydrogen@latest -- --template demo-store
```

Remember to update `.env` with your shop's domain and Storefront API token!

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Project screenshots

Captured screenshots are saved in `public/images`:

- `public/images/babouches-desktop.png`
- `public/images/babouches-mobile.png`
- `public/images/babouches-desktop-fullpage.png`
- `public/images/babouches-mobile-fullpage.png`

These show the homepage in desktop and mobile views, including full-page screenshots from top to bottom.

## Setup for using Customer Account API (`/account` section)

### Setup public domain using ngrok

1. Setup a [ngrok](https://ngrok.com/) account and add a permanent domain (ie. `https://<your-ngrok-domain>.app`).
1. Install the [ngrok CLI](https://ngrok.com/download) to use in terminal
1. Start ngrok using `ngrok http --domain=<your-ngrok-domain>.app 3000`

### Include public domain in Customer Account API settings

1. Go to your Shopify admin => `Hydrogen` or `Headless` app/channel => Customer Account API => Application setup
1. Edit `Callback URI(s)` to include `https://<your-ngrok-domain>.app/account/authorize`
1. Edit `Javascript origin(s)` to include your public domain `https://<your-ngrok-domain>.app` or keep it blank
1. Edit `Logout URI` to include your public domain `https://<your-ngrok-domain>.app` or keep it blank
