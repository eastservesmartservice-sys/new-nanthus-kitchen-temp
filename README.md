# New Nanthu's Kitchen - Website

A modern, single-page React application for New Nanthu's Kitchen, featuring authentic Sri Lankan cuisine. Built with React, TypeScript, Material-UI, and Three.js for an immersive user experience.

## Features

- 🎨 Modern, responsive design with smooth animations
- 📱 Mobile-first approach
- 🎯 Single-page application with hash-based navigation
- 🔍 SEO optimized with proper meta tags and sitemap
- ♿ Accessible design with ARIA labels
- 🚀 Fast performance with Vite
- 🎭 Interactive 3D background with Three.js
- 📊 Legacy WordPress URL redirects for SEO preservation

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **Three.js** - 3D graphics
- **Framer Motion** - Animations
- **Lenis** - Smooth scrolling
- **Vite** - Build tool

## SEO & Legacy URL Handling

This application includes comprehensive 301 redirect handling for legacy WordPress URLs to preserve SEO value:

- `/contact-us/` → `/#contact`
- `/our-menu/` → `/#menu`
- Old WordPress assets → New asset locations

For detailed information, see [docs/LEGACY_URL_REDIRECTS.md](docs/LEGACY_URL_REDIRECTS.md)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Landing section
│   ├── Menu.tsx        # Menu section
│   ├── Special.tsx     # Specials section
│   ├── TakeAway.tsx    # Order section
│   ├── Catering.tsx    # Catering section
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── utils/              # Utility functions
│   └── legacyUrlHandler.ts  # SEO redirect handler
├── assets/             # Static assets
├── theme.ts           # MUI theme configuration
└── App.tsx            # Main app component
```

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel deploy

# Or connect to GitHub for automatic deployments
```

The `vercel.json` configuration includes:
- 301 redirects for legacy URLs
- Security headers
- Asset caching rules
- SPA routing fallback

### Other Hosting

For Apache-based hosting, the `public/.htaccess` file provides:
- Legacy URL redirects
- SPA routing
- Security headers
- Asset caching

## Environment Variables

No environment variables required for basic operation.

## License

Private - All rights reserved to New Nanthu's Kitchen

---

# Development Notes

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
