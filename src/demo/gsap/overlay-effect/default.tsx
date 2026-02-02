"use client";

import { useState } from "react";

import { OverlayEffect, OverlayEffectProps } from "@/components/gsap/overlay-effect";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const Demo = () => {
    const [effect, setEffect] = useState("type-2");

    return (
        <div>
            <div className="flex justify-center">
                <Select value={effect} onValueChange={setEffect}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a effect" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Overlay Effect</SelectLabel>
                            <SelectItem value="type-1">Type 1</SelectItem>
                            <SelectItem value="type-2">Type 2</SelectItem>
                            <SelectItem value="type-3">Type 3</SelectItem>
                            <SelectItem value="type-4">Type 4</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="mt-6 cursor-none overflow-hidden rounded-md">
                <img
                    src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1000"
                    alt="Background"
                    className="aspect-square w-120 rounded-md object-cover"
                />
                <OverlayEffect effect={effect as OverlayEffectProps["effect"]} />
            </div>
        </div>
    );
};
