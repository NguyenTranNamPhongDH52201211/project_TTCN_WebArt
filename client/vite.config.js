import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
        port: 3001,  // 👈 đổi port tại đây

    proxy: {
      
      "/api": "http://localhost:3000",      // proxy API
      "/images": "http://localhost:3000"    // proxy ảnh
    }
  }
});
