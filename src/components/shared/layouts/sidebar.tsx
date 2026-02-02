import { Link, useLocation } from "@tanstack/react-router";

import { Folder, Node } from "fumadocs-core/page-tree";

import { cn } from "@/lib/utils";

import { Logo } from "@/components/shared/layouts/logo";
import { SidebarContent, SidebarHeader } from "@/components/ui/sidebar";

import { navItems } from "./config";
import { SidebarItem } from "./sidebar-item";

const filterTree = (tree: Folder, path: string) => {
    const navItem = navItems.find((item) => path.includes(item.href)) ?? navItems[0];

    const canAddFolder = (item: Node) => {
        if (item.type == "folder") {
            return item.children.some((child) => {
                return child.type === "page" && child.url.startsWith(navItem?.href);
            });
        }
    };
    return tree.children.filter((item) => canAddFolder(item));
};

export const Sidebar = ({
    tree,
    extraItems = [],
    className,
    showHeader = false,
}: {
    tree: Folder;
    extraItems?: Node[];
    className?: string;
    showHeader?: boolean;
}) => {
    const { pathname } = useLocation();
    const items = filterTree(tree, pathname);

    return (
        <div className={cn("bg-sidebar text-sidebar-foreground flex flex-col overflow-auto", className)}>
            {showHeader && (
                <SidebarHeader className="max-md:items-start max-md:px-4">
                    <Link to="/">
                        <Logo responsive={false} />
                    </Link>
                </SidebarHeader>
            )}
            <SidebarContent className="no-scrollbar bg-background relative gap-0 overflow-x-hidden px-2">
                <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-8 shrink-0 bg-linear-to-b blur-xs max-md:hidden" />
                {extraItems.map((item, index) => {
                    return <SidebarItem item={item} key={index} />;
                })}
                {items.map((item, index) => {
                    return <SidebarItem item={item} key={index} />;
                })}
                <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t blur-xs" />
            </SidebarContent>
        </div>
    );
};
