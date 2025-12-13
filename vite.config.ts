import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Эта строка предотвращает ошибку "process is not defined" (Белый экран)
    'process.env': {}
  }
});