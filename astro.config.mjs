import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://anikepal.dev',
  integrations: [
    tailwind({
      // global.css owns the Tailwind layers so the theme variables load first.
      applyBaseStyles: false,
    }),
  ],
});
