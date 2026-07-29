import { createFileRoute } from "@tanstack/react-router";

import { getHeadMeta } from "@/features/seo/meta";

import { Demo } from "@/components/pages/home/demo";
import { Feature } from "@/components/pages/home/feature";
import { Hero } from "@/components/pages/home/hero";
import { Footer } from "@/components/shared/layouts/footer";
import { Topbar } from "@/components/shared/layouts/topbar";

export const Route = createFileRoute("/")({
    component: RouteComponent,
    head: () => {
        return {
            ...getHeadMeta({
                canonicalUrl: "",
            }),
        };
    },
});

function RouteComponent() {
    return (
        <div>
            <a
                href="https://paceui.com"
                target="_blank"
                className="bg-muted group flex h-8 w-full items-center justify-center">
                <span className="max-md:hidden">
                    <span className="font-medium text-blue-500 group-hover:underline">PaceUI</span> - Components,
                    Blocks, Templates, Starters & much more...
                </span>
                <span className="md:hidden">
                    <span className="font-medium text-blue-500 group-hover:underline">PaceUI</span> - Blocks for real
                    apps
                </span>
            </a>
            <div className="bg-background/90 sticky top-0 z-10 border-b border-dashed backdrop-blur-md">
                <div className="container">
                    <Topbar />
                </div>
            </div>
            <div className="overflow-hidden">
                <div className="container">
                    <Hero />
                    <Feature />
                    <Demo />
                </div>
            </div>
            <div className="bg-background/90 sticky top-0 z-10 mt-8 border-t border-dashed xl:mt-16">
                <Footer className="container" />
            </div>
        </div>
    );
}
