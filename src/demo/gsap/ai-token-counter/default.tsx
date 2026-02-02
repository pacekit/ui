"use client";

import { useRef, useState } from "react";

import { ArrowUpIcon, SquareIcon } from "lucide-react";

import { AiTokenCounter } from "@/components/gsap/ai-token-counter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const Demo = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [token, setToken] = useState(0);
    const [generating, setGenerating] = useState(false);

    const onGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setToken((t) => t + Math.floor(Math.random() * 100) + 10);
            setGenerating(false);
        }, 1000);
    };

    return (
        <Card className="max-w-2xl grow" size="sm">
            <CardContent>
                <Textarea
                    className="h-36 resize-none appearance-none border-none bg-transparent! p-0 shadow-none ring-0!"
                    placeholder="Ask me anything... It will consume a token 😉"
                />
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">ChatGPT</p>
                    <div className="relative flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <AiTokenCounter
                                sourceRef={buttonRef}
                                token={token}
                                className="font-medium"
                                flyingClassName="text-sm text-primary z-100"
                            />
                            <p className="text-muted-foreground text-sm">/1000</p>
                        </div>
                        <Button
                            className="text-primary-foreground size-8 cursor-pointer"
                            disabled={generating}
                            onClick={onGenerate}
                            ref={buttonRef}>
                            {generating ? <SquareIcon /> : <ArrowUpIcon />}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
