"use client";

import { useState } from "react";

import { RevealText } from "@/components/gsap/reveal-text";

export const RevealTextDemo = () => {
    const [revealTextKey, setRevealTextKey] = useState(0);

    return (
        <RevealText className="-mt-1" onClick={() => setRevealTextKey(revealTextKey + 1)} key={revealTextKey}>
            <p className="text-center text-2xl font-semibold text-shadow-lg text-shadow-purple-700/5">
                Animate with GSAP
            </p>
        </RevealText>
    );
};
