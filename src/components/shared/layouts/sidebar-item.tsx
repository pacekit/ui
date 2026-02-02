import { Link, useLocation } from "@tanstack/react-router";

import * as PageTree from "fumadocs-core/page-tree";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export const SidebarItem = ({ item }: { item: PageTree.Node }) => {
    const { pathname } = useLocation();

    if (item.type == "folder") {
        return (
            <SidebarGroup className="p-0 not-first:mt-4">
                <SidebarGroupLabel className="text-foreground/50 text-sm not-first:mt-4">{item.name}</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu className="w-full">
                        {item.children.map((item, index) => {
                            return <SidebarItem item={item} key={index} />;
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    }
    if (item.type == "page") {
        return (
            <SidebarMenuItem key={item.url}>
                <Button
                    nativeButton={false}
                    variant="ghost"
                    className={cn("text-foreground h-7.5 w-full justify-start border-0 px-2 font-normal", {
                        "bg-accent font-medium": item.url === pathname,
                    })}
                    render={<Link to={item.url}>{item.name}</Link>}></Button>
            </SidebarMenuItem>
        );
    }
    if (item.type == "separator") {
        return <SidebarGroupLabel className="text-foreground/50 text-sm not-first:mt-4">{item.name}</SidebarGroupLabel>;
    }
};
