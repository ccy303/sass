import { defineConfig } from "vite";
import path from "path";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from "unplugin-auto-import/vite";
import unocss from "unocss/vite";
import vitePluginRequire from "vite-plugin-require";
import formatPageJson from "./vitePlugin/format.page.json.js";

export default defineConfig({
    plugins: [formatPageJson(), uni(), unocss(), AutoImport({ imports: ["vue"] }), vitePluginRequire({ fileRegex: /(.js)$/ })],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    build: {
        sourcemap: true
    }
});
