import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { fileURLToPath, URL } from "node:url";
import mockJS from "mockjs";
import url from "node:url";

const viteMockServer = (): Plugin => {
  return {
    name: "vite-mock-server",
    configureServer(server) {
      server.middlewares.use("/api/v1/list", (req, resp) => {
        const urlData = url.parse(req.originalUrl!, true);
        const data = mockJS.mock({
          "list|1000": [
            {
              "id|+1": 1,
              keyword: urlData.query.keyword,
              address: "@county(true)",
            },
          ],
        });
        resp.setHeader("Content-Type", "application/json");
        resp.end(JSON.stringify(data));
      });
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteMockServer()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
