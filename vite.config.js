import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/devine/', // Replace '<repository>' with your GitHub repository name
  build: {
    chunkSizeWarningLimit: 1000 // Set the limit to 1000 kB or higher
  }
});
