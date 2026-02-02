"use client";

import { useState } from "react";

import { CheckIcon, ClipboardIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { DotFlow } from "@/components/gsap/dot-flow";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { FlowBuilderHook } from "../use-flow-builder";

export const Preview = ({ hook }: { hook: FlowBuilderHook }) => {
    const { flows } = hook;

    const [isCopied, setIsCopied] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const copy = () => {
        setIsCopied(true);

        const text = `<DotFlow
                    items={${JSON.stringify(flows)}}></DotFlow>`;

        navigator.clipboard.writeText(text);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center rounded border p-6">
            <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-medium">Preview</p>
            </div>
            <div className="mt-6 flex w-fit items-center justify-center rounded-lg bg-black p-2">
                <DotFlow items={flows} isPlaying={isPlaying} />
            </div>
            <div className="mt-6 flex items-center gap-3">
                <Button
                    variant="outline"
                    className="cursor-pointer shadow-none"
                    onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? "Pause" : "Play"}
                </Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    onClick={copy}
                                    variant="outline"
                                    size="icon"
                                    className="relative cursor-pointer shadow-none">
                                    <ClipboardIcon
                                        className={cn("absolute size-5 transition-all duration-300", {
                                            "scale-50 opacity-0": isCopied,
                                        })}
                                    />
                                    <CheckIcon
                                        className={cn(
                                            "absolute size-5 scale-50 opacity-0 transition-all duration-300",
                                            {
                                                "scale-100 opacity-100": isCopied,
                                            },
                                        )}
                                    />
                                </Button>
                            }
                        />
                        <TooltipContent>
                            <p>Copy Component</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};
