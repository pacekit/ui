"use client";

import { ScrambleText } from "@/components/gsap/scramble-text";

export const ScrambleDemo = () => {
    return (
        <ScrambleText className="font-mono text-lg font-medium sm:text-xl xl:text-3xl">
            <p>Hover your cursor to distort</p>
        </ScrambleText>
    );
};
