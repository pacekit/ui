"use client";

import { type ComponentProps, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export type AISuggestionsProps = ComponentProps<typeof ScrollArea> & {
    show?: boolean;
};

export const AISuggestions = ({ className, children, show = true, ...props }: AISuggestionsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const el = containerRef.current;
            if (!el) return;

            if (show) {
                gsap.to(el, {
                    height: "auto",
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.5,
                    ease: "power2.out",
                    pointerEvents: "auto",
                });
            } else {
                gsap.to(el, {
                    height: 0,
                    opacity: 0,
                    filter: "blur(8px)",
                    duration: 0.5,
                    ease: "power2.in",
                    pointerEvents: "none",
                });
            }
        },
        { dependencies: [show] },
    );

    return (
        <ScrollArea ref={containerRef} className="relative w-full overflow-x-auto whitespace-nowrap" {...props}>
            <div className={cn("relative flex w-max flex-nowrap items-center gap-2", className)}>{children}</div>
            <div className="from-background absolute end-0 top-0 h-full w-8 bg-linear-to-l to-transparent"></div>
            <ScrollBar className="hidden" orientation="horizontal" />
        </ScrollArea>
    );
};

export type AISuggestionProps = ComponentProps<typeof Button> & {
    suggestion?: string;
};

export const AISuggestion = ({
    suggestion,
    variant = "outline",
    size = "sm",
    children,
    ...props
}: AISuggestionProps) => {
    return (
        <Button type="button" size={size} variant={variant} {...props}>
            {children || suggestion}
        </Button>
    );
};
