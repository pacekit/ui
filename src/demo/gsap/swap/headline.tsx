"use client";

import { useEffect, useState } from "react";

import { Swap } from "@/components/gsap/swap";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const avatars = ["https://github.com/shadcn.png", "https://github.com/leerob.png", "https://github.com/rauchg.png"];

export const Demo = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((current) => current + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-4xl text-center text-4xl/relaxed font-semibold tracking-tight">
            If you’re starting a project,
            <br />
            Discover
            <span className="mx-5 mb-2.5 inline-flex items-center gap-2.5 self-center align-middle">
                <Swap state={current} effects={["opacity", "blur"]} duration={0.8}>
                    {(state) => (
                        <Avatar className="size-16">
                            <AvatarImage src={avatars[state % 3]} alt="@github" />
                        </Avatar>
                    )}
                </Swap>
                <Swap state={current} effects={["opacity", "blur"]} duration={0.8}>
                    {(state) => (
                        <Avatar className="size-16">
                            <AvatarImage src={avatars[(state + 1) % 3]} alt="@github" />
                        </Avatar>
                    )}
                </Swap>
                <Swap state={current} effects={["opacity", "blur"]} duration={0.8}>
                    {(state) => (
                        <Avatar className="size-16">
                            <AvatarImage src={avatars[(state + 2) % 3]} alt="@github" />
                        </Avatar>
                    )}
                </Swap>
            </span>
            innovations
            <br />
            that redefine how we build
        </div>
    );
};
