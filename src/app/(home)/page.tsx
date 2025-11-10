import { Footer } from "@/components/docs/layouts/footer";
import { Topbar } from "@/components/docs/layouts/topbar";
import { Newsletter } from "@/components/docs/newsletter";

import { Demo } from "./components/demo";
import { Feature } from "./components/feature";
import { Hero } from "./components/hero";
import Link from "next/link";

export default function LandingPage() {
    return (
        <div>
            <Link href="https://tanship.paceui.com" target="_blank" className="w-full h-7 bg-muted flex items-center justify-center text-sm group">
                <span className="max-md:hidden"><span className="text-blue-500 font-medium group-hover:underline">Introducing Tanship:</span> The <span className="font-medium">Tanstack Start</span> boilerplate with auth & DB. Launch faster.</span>
                <span className="md:hidden"><span className="text-blue-500 font-medium group-hover:underline">Tanship:</span> Tanstack Start with auth & DB.</span>
            </Link>
            <div className="bg-background/90 sticky top-0 z-10 border-b border-dashed backdrop-blur-md">
                <div className="container h-16">
                    <Topbar showLogo />
                </div>
            </div>
            <div className="overflow-hidden">
                <div className="container">
                    <Hero />
                    <Feature />
                    <Demo />
                    <div className="my-8 flex justify-center lg:my-16 2xl:my-24">
                        <Newsletter />
                    </div>
                </div>
            </div>
            <div className="bg-background/90 sticky top-0 z-10 border-t border-dashed">
                <Footer className="container" />
            </div>
        </div>
    );
}
