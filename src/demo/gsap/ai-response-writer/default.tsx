"use client";

import { useState } from "react";

import { useWriter } from "@/hooks/gsap/use-writer";

import { AiResponseWriter } from "@/components/gsap/ai-response-writer";
import { Swap } from "@/components/gsap/swap";
import { Card, CardContent } from "@/components/ui/card";

const responses = [
    {
        title: "Thinking",
        content:
            "Analyzing step by step...\n" +
            "User needs a component that auto-opens on streaming and closes when done.\n" +
            "A collapsible design with clean state handling seems ideal.",
    },
    {
        title: "Planning",
        content:
            "Shaping the approach...\n" +
            "Combine controlled patterns with auto state awareness.\n" +
            "Keep integration flexible and UI minimal.",
    },
    {
        title: "Drafting",
        content:
            "Outlining structure...\n" +
            "Define props, state flow, and basic interactions.\n" +
            "Sketch the logic for seamless behavior.",
    },
    {
        title: "Refining",
        content:
            "Polishing details...\n" +
            "Simplify interactions and adjust for smooth transitions.\n" +
            "Focus on clarity and consistency in UI flow.",
    },
    {
        title: "Generating",
        content:
            "Building the solution...\n" +
            "Auto-open with streaming, close gracefully after.\n" +
            "Ensure clean design and align with codebase conventions.",
    },
];

export const Demo = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [response, setResponse] = useState(responses[0].content);

    const nextStep = () => {
        if (currentStep >= responses.length - 1) {
            return;
        }
        setResponse((r) => r + "\n\n" + responses[currentStep + 1].content);
        setCurrentStep(currentStep + 1);
    };

    const text = useWriter(response, {
        onDone: nextStep,
        mode: "word",
        speed: 6,
    });

    return (
        <Card className="max-w-2xl grow" size="sm">
            <CardContent>
                <Swap state={currentStep} effects={["slideUp", "opacity", "blur"]}>
                    {(state) => <p className="font-medium">{responses[state].title}</p>}
                </Swap>
                <AiResponseWriter text={text} className="mt-3 h-40" />
            </CardContent>
        </Card>
    );
};
