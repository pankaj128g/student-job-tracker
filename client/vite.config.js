import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import React from "react";


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
