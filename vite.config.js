// vite.config.js
import { defineConfig } from 'vite';
import { createAngularPlugin } from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [createAngularPlugin()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 4200,
    allowedHosts: [
      'anag-front-production.up.railway.app',
      '.railway.app',
      'localhost'
    ]
  }
});
