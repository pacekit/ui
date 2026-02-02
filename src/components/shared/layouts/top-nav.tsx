import { Link, useLocation } from "@tanstack/react-router";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { NavItem } from "./config";

type Props = ComponentProps<"nav"> & { items: NavItem[] };

export const TopNav = ({ items, className, ...props }: Props) => {
    const { pathname } = useLocation();

    return (
        <nav className={cn("items-center gap-0", className)} {...props}>
            {items.map((item) => (
                <Button
                    key={item.href}
                    variant="ghost"
                    size="sm"
                    className={cn("px-2.5", {
                        "bg-muted": pathname.includes(item.href),
                    })}
                    nativeButton={false}
                    render={
                        <Link to={item.href} data-active={pathname === item.href} className="relative items-center">
                            {item.label}
                        </Link>
                    }></Button>
            ))}
        </nav>
    );
};
