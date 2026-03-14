import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'wedding_invite' to your GitHub repository name when deploying
export default defineConfig({
  plugins: [react()],
  base: '/wedding_invite/',
})
