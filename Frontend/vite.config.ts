import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [ tailwindcss(),react(),],
  server:{
    allowedHosts:["0d0c-117-254-224-26.ngrok-free.app"]
  }
})
