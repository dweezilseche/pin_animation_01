# m1-2025-pin-animation

Projet Vite configuré avec:

- GSAP (animations)
- Lenis (smooth scrolling)
- Sass (SCSS)

## Démo

> **Note**: La vidéo de démo est disponible localement dans le projet (`video_demo_pin_animation.gif` / `video_demo_pin_animation.mp4`) mais n'est pas incluse dans le repo GitHub en raison de sa taille (>100MB).

Pour voir l'animation en action, clonez le projet et lancez-le localement avec `npm run dev`.

## Installation

```bash
npm install
```

Si vous partez d’un clone sans `node_modules`, cette commande installera GSAP, Lenis et Sass (déjà listés dans `package.json`).

## Développement

```bash
npm run dev
```

Vite démarre un serveur local et recharge à chaud. Ouvrez l’URL affichée dans le terminal.

## Build de production

```bash
npm run build
npm run preview
```

## Où regarder dans le code

- `src/main.js`
  - Import de `gsap` et de `lenis`
  - Animation d’intro simple avec GSAP
  - Initialisation du smooth scroll Lenis via une boucle `requestAnimationFrame`
- `src/style.scss`
  - Styles écrits en SCSS (exemples de nesting). Vite gère Sass automatiquement grâce à la dépendance `sass`.

## Notes

- Le paquet `@studio-freight/lenis` a été renommé en `lenis`. Ce projet utilise le nouveau nom de paquet.
- Pour créer vos propres animations, consultez la doc GSAP: https://gsap.com/docs/
- Pour ajuster Lenis: https://www.npmjs.com/package/lenis
