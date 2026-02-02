import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import { ThemeProvider } from "next-themes";

import { Topbar } from "@/components/shared/layouts/topbar";
import { Toaster } from "@/components/ui/sonner";

import appCss from "@/styles/globals.css?url";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    shellComponent: RootDocument,
});

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute={["class", "data-theme"]}>
            <RootProvider>
                <Toaster />
                <QueryClientProvider client={queryClient}>
                    <div className="container-wrapper flex min-h-svh w-full flex-col [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] [--sidebar-min-width:12rem] [--sidebar-width:14rem]">
                        <Topbar />
                        {children}
                    </div>
                </QueryClientProvider>
                <Analytics />
                <Scripts />
            </RootProvider>
        </ThemeProvider>
    );
};

function RootDocument({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body suppressHydrationWarning>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
