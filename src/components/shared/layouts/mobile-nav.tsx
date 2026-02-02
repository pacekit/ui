import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import type { Folder, Node } from "fumadocs-core/page-tree";
import { MenuIcon } from "lucide-react";

import { getPageTree } from "@/features/docs/page-tree";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import { navItems } from "./config";
import { Sidebar } from "./sidebar";

const extraItems: Node[] = [
    {
        type: "folder",
        name: "Navigation",
        children: navItems.map((navItem) => {
            return {
                type: "page",
                name: navItem.label,
                url: navItem.href,
            } as Node;
        }),
    },
];

export const MobileNav = () => {
    const [pageTree, setPageTree] = useState<Folder | null>(null);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        getPageTree().then(setPageTree);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <Drawer direction="left" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Mobile navigation">
                    <MenuIcon />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="w-72!">
                <DrawerTitle className="hidden">Dialog Title</DrawerTitle>
                {pageTree && <Sidebar extraItems={extraItems} showHeader tree={pageTree} />}
            </DrawerContent>
        </Drawer>
    );
};
