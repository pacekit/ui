import { QueryClient } from "@tanstack/query-core";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
    const queryClient = new QueryClient();

    const router = createTanStackRouter({
        routeTree,
        defaultPreload: "intent",
        scrollRestoration: true,
        context: { queryClient },
    });

    setupRouterSsrQueryIntegration({
        router,
        queryClient,
    });

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: ReturnType<typeof getRouter>;
    }
}
