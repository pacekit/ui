"use client";

import { useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

type ResponseWriterProps = {
    text: string;
};

export const AiResponseWriter = ({ text, ...props }: ResponseWriterProps) => {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current?.querySelector("div:first-child");
            if (viewport) {
                viewport.scrollTo({
                    top: viewport.scrollHeight,
                    behavior: "smooth",
                });
            }
        }
    }, [text]);

    return (
        <ScrollArea ref={scrollAreaRef} {...props}>
            <div className="pr-4">
                <p className="text-foreground/80 text-sm whitespace-pre-line">{text}</p>
            </div>
        </ScrollArea>
    );
};
