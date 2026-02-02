"use client";

import { useState } from "react";

import { FlipReveal, FlipRevealItem } from "@/components/gsap/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const Demo = () => {
    const [keys, setKeys] = useState<string[]>(["all"]);

    return (
        <div className="flex min-h-100 flex-col items-center gap-6 sm:gap-8">
            <ToggleGroup className="bg-background rounded-md border p-1" value={keys} onValueChange={(e) => setKeys(e)}>
                <ToggleGroupItem value="all" className="px-4">
                    All
                </ToggleGroupItem>
                <ToggleGroupItem value="odd" className="px-4">
                    Odd
                </ToggleGroupItem>
                <ToggleGroupItem value="even" className="px-4">
                    Even
                </ToggleGroupItem>
            </ToggleGroup>
            <FlipReveal className="grid grid-cols-3 gap-4" keys={keys} showClass="flex" hideClass="hidden">
                {Array.from({ length: 9 }).map((_, i) => (
                    <FlipRevealItem
                        flipKey={i % 2 == 1 ? "even" : "odd"}
                        key={i}
                        className="bg-muted flex size-20 items-center justify-center rounded-md sm:size-24">
                        {i + 1}
                    </FlipRevealItem>
                ))}
            </FlipReveal>
        </div>
    );
};
