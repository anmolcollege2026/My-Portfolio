import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  
  base: '/My-Portfolio/', 

  cacheDir: 'C:/vite-cache/anmol-verma-portfolio',

  server: {
    port: 3000,
    open: true
  }
});