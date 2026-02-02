import { createFileRoute } from "@tanstack/react-router";

import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/features/docs/source";

const server = createFromSource(source, {
    language: "english",
});

export const Route = createFileRoute("/api/search")({
    server: {
        handlers: {
            GET: async ({ request }) => {
                const res = await (await server.GET(request)).json();
                return new Response(JSON.stringify(res));
            },
        },
    },
});
