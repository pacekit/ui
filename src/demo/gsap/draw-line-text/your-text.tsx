"use client";

import { useEffect, useRef, useState } from "react";

import { DrawLineText } from "@/components/gsap/draw-line-text";
import { Input } from "@/components/ui/input";

export const Demo = () => {
    const [text, setText] = useState("Write Anything");
    const [inputValue, setInputValue] = useState("Write Anything");
    const [key, setKey] = useState(0);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (text == inputValue) return;

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setText(inputValue);
            setKey((prev) => prev + 1);
        }, 500);
    }, [inputValue, text]);

    return (
        <div className="flex flex-col items-center gap-4">
            <Input
                value={inputValue}
                className="bg-background max-w-64"
                onChange={(e) => setInputValue(e.target.value)}></Input>
            <DrawLineText
                oneByOne={false}
                className="font-medium"
                fontSize={60}
                strokeWidth={1.5}
                wordSpacing={12}
                text={text}
                color="var(--color-blue-500)"
                key={key}
            />
        </div>
    );
};
