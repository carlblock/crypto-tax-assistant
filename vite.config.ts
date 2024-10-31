import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
const ReactCompilerConfig = { target: '18' }


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        ["babel-plugin-react-compiler", ReactCompilerConfig],
      ],
    },
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
