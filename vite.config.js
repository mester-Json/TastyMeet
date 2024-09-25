import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'global': {},  // Ajoutez ceci pour définir 'global' comme un objet vide
  },
});