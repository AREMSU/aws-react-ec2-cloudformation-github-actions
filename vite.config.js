import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build info shown in the page footer. GITHUB_SHA is set automatically inside GitHub Actions.
const commit = (process.env.GITHUB_SHA || 'local').slice(0, 7);
const builtAt = new Date().toISOString();

export default defineConfig({
  plugins: [react()],
  define: {
    __COMMIT__: JSON.stringify(commit),
    __BUILT_AT__: JSON.stringify(builtAt),
  },
});
