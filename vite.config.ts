import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    VitePWA({
      includeAssets: ['*.png', '*.svg', '*.jpg', '*.json'],
      manifest: {
        name: 'In Theory',
        short_name: 'In Theory',
        description: 'Modern leaning of driving theory',
        theme_color: '#6b7280',
        icons: [
          {
            src: '/images/logo/logo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/logo/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
