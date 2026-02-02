"use client";

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import { framePresets } from "../presets";
import { FlowBuilderHook } from "../use-flow-builder";

export const Playground = ({ hook }: { hook: FlowBuilderHook }) => {
    const {
        frames,
        currentFlow,
        move,
        currentFrame,
        invertFrame,
        clearFrame,
        selectFramePreset,
        handlePointerUp,
        handlePointerDown,
        handlePointerEnter,
        totalDots,
    } = hook;

    return (
        <div>
            <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-medium">{currentFlow}</p>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="outline" className="shadow-none">
                                    Preset
                                </Button>
                            }
                        />
                        <DropdownMenuContent className="p-0">
                            <ScrollArea className="h-64 w-full">
                                <div className="p-1">
                                    {framePresets.map((preset, index) => (
                                        <DropdownMenuItem key={index} onClick={() => selectFramePreset(index)}>
                                            {preset.title}
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="mt-6 flex items-center gap-6">
                <Button
                    size="icon"
                    className="cursor-pointer shadow-none"
                    variant="outline"
                    onClick={() => move("left")}>
                    <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <div className="flex flex-col items-center gap-5">
                    <Button
                        size="icon"
                        className="cursor-pointer shadow-none"
                        variant="outline"
                        onClick={() => move("up")}>
                        <ChevronUpIcon className="h-4 w-4" />
                    </Button>
                    <div className="grid h-fit w-fit grid-cols-7 grid-rows-7 gap-1">
                        {Array.from({ length: totalDots }).map((_, i) => (
                            <div
                                key={i}
                                data-index={i}
                                onPointerDown={() => handlePointerDown(i)}
                                onPointerEnter={() => handlePointerEnter(i)}
                                onPointerUp={handlePointerUp}
                                className={cn(
                                    "bg-foreground min-h-4 min-w-4 cursor-pointer rounded-full opacity-10 transition-all hover:opacity-30",
                                    {
                                        "opacity-80!": frames[currentFrame]?.includes(i),
                                    },
                                )}
                            />
                        ))}
                    </div>
                    <Button
                        size="icon"
                        className="cursor-pointer shadow-none"
                        variant="outline"
                        onClick={() => move("down")}>
                        <ChevronDownIcon className="h-4 w-4" />
                    </Button>
                </div>
                <Button
                    size="icon"
                    className="cursor-pointer shadow-none"
                    variant="outline"
                    onClick={() => move("right")}>
                    <ChevronRightIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="mt-6">
                <p className="text-muted-foreground text-sm font-medium">Modifier</p>
                <div className="mt-2 flex items-center gap-2">
                    <Button onClick={invertFrame} variant="outline" className="cursor-pointer shadow-none">
                        Invert
                    </Button>
                    <Button onClick={clearFrame} variant="outline" className="cursor-pointer shadow-none">
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    );
};
