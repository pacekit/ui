"use client";

import { useEffect, useState } from "react";

import { DrawLineText } from "@/components/gsap/draw-line-text";

export const DrawLineDemo = () => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setKey((k) => k + 1);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <DrawLineText
            key={key}
            className="font-medium"
            oneByOne={false}
            fontSize={64}
            letterSpacing={-2}
            wordSpacing={20}
            strokeWidth={1.5}
            text="Bold Strokes"
            color="var(--color-orange-400)"
        />
    );
};
