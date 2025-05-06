import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Se você já tiver esta linha, mantenha-a
import tailwindcss from '@tailwindcss/vite' // Importe o plugin tailwindcss

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Se você já tiver este plugin, mantenha-o
    tailwindcss(), // Adicione o plugin tailwindcss aqui
  ],
})