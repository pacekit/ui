import { ReactNode, useEffect, useMemo, useState } from "react";

import { TextAlignStartIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const useActiveItem = (itemIds: string[]) => {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: "0% 0% -80% 0%" },
        );

        for (const id of itemIds ?? []) {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        }

        return () => {
            for (const id of itemIds ?? []) {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            }
        };
    }, [itemIds]);

    return activeId;
};

export const DocsTableOfContents = ({
    toc,
    variant = "list",
    className,
}: {
    toc: {
        title?: ReactNode;
        url: string;
        depth: number;
    }[];
    variant?: "dropdown" | "list";
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    const itemIds = useMemo(() => toc.map((item) => item.url.replace("#", "")), [toc]);
    const activeHeading = useActiveItem(itemIds);

    if (!toc?.length) {
        return null;
    }

    if (variant === "dropdown") {
        return (
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger
                    render={
                        <Button variant="outline" size="sm" className={cn("h-8 md:h-7", className)}>
                            <TextAlignStartIcon /> On This Page
                        </Button>
                    }></DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="no-scrollbar max-h-[70svh]">
                    {toc.map((item) => (
                        <DropdownMenuItem
                            key={item.url}
                            render={<a href={item.url}>{item.title}</a>}
                            onClick={() => {
                                setOpen(false);
                            }}
                            data-depth={item.depth}
                            className="data-[depth=3]:pl-6 data-[depth=4]:pl-8"></DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className={cn("flex flex-col gap-2 pt-0 text-sm", className)}>
            <div className="text-muted-foreground flex h-6 items-center gap-2">
                <TextAlignStartIcon className="size-4" />
                <p className="sticky top-0 text-xs font-medium">On This Page</p>
            </div>
            {toc.map((item) => (
                <a
                    key={item.url}
                    href={item.url}
                    className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[depth=3]:pl-4 data-[depth=4]:pl-6"
                    data-active={item.url === `#${activeHeading}`}
                    data-depth={item.depth}>
                    {item.title}
                </a>
            ))}
        </div>
    );
};
