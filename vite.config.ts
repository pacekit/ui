import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    server: {
        port: 3000,
        allowedHosts: ["ed55f2729b8b.ngrok-free.app"],
    },
    ssr: {
        noExternal: ["react-tweet"],
    },
    build: {
        target: "es2022",
        sourcemap: false,
    },
    plugins: [
        mdx(await import("./source.config")),
        tailwindcss(),
        tsConfigPaths({
            projects: ["./tsconfig.json"],
        }),
        tanstackStart({
            prerender: {
                enabled: true,
            },
        }),
        react(),
        nitro({
            preset: "vercel",
            vercel: {
                entryFormat: "node",
            },
        }),
    ],
});
