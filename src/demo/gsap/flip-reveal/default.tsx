"use client";

import { useState } from "react";

import { FlipReveal, FlipRevealItem } from "@/components/gsap/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const Demo = () => {
    const [keys, setKeys] = useState<string[]>(["all"]);

    return (
        <div className="flex min-h-120 flex-col items-center gap-8">
            <ToggleGroup className="bg-background rounded-md border p-1" value={keys} onValueChange={(e) => setKeys(e)}>
                <ToggleGroupItem value="all" className="sm:px-4">
                    All
                </ToggleGroupItem>
                <ToggleGroupItem value="shirt" className="sm:px-4">
                    Shirt
                </ToggleGroupItem>
                <ToggleGroupItem value="goggles" className="sm:px-4">
                    Goggles
                </ToggleGroupItem>
                <ToggleGroupItem value="shoes" className="sm:px-4">
                    Shoes
                </ToggleGroupItem>
            </ToggleGroup>
            <FlipReveal className="grid grid-cols-3 gap-3 sm:gap-4" keys={keys} showClass="flex" hideClass="hidden">
                <FlipRevealItem flipKey="shirt">
                    <img
                        src="https://images.unsplash.com/photo-1696086152504-4843b2106ab4?q=80&w=300"
                        alt="Shirt"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="goggles">
                    <img
                        src="https://images.unsplash.com/photo-1648688135643-2716ec8f4b24?q=80&w=300"
                        alt="Goggles"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="shoes">
                    <img
                        src="https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?q=80&w=300"
                        alt="Shoes"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="goggles">
                    <img
                        src="https://images.unsplash.com/photo-1632168844625-b22d7b1053c0?q=80&w=300"
                        alt="Goggles"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="shirt">
                    <img
                        src="https://images.unsplash.com/photo-1583656346517-4716a62e27b7?q=80&w=300"
                        alt="Shirt"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="shoes">
                    <img
                        src="https://images.unsplash.com/photo-1596480370804-cff0eed14888?q=80&w=300"
                        alt="Shoes"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="shirt">
                    <img
                        src="https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=300"
                        alt="Goggles"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>{" "}
                <FlipRevealItem flipKey="shoes">
                    <img
                        src="https://images.unsplash.com/photo-1696086152508-1711cc7bcc9d?q=80&w=300"
                        alt="Shoes"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>
                <FlipRevealItem flipKey="goggles">
                    <img
                        src="https://images.unsplash.com/photo-1684790369514-f292d2dffc11?q=80&w=300"
                        alt="Goggles"
                        className="size-20 rounded-md sm:size-24 xl:size-32"
                    />
                </FlipRevealItem>
            </FlipReveal>
        </div>
    );
};
