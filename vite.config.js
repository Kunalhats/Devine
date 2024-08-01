import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace with your repository name if it's different
const base = '/Devine/';

export default defineConfig({
  plugins: [react()],
  base: base,
});
