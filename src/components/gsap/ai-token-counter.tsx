"use client";

import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { cn } from "@/lib/utils";

gsap.registerPlugin(MotionPathPlugin);

export const AiTokenCounter = ({ sourceRef, token, className, flyingClassName, ...props }: any) => {
    const [displayCount, setDisplayCount] = useState(token);
    const lastToken = useRef(token);
    const counterRef = useRef<HTMLParagraphElement>(null);
    const flyingRef = useRef<HTMLParagraphElement>(null);

    useGSAP(
        () => {
            const diff = token - lastToken.current;
            if (diff === 0 || !sourceRef.current || !counterRef.current || !flyingRef.current) return;

            const startValue = lastToken.current;
            lastToken.current = token;

            const [src, dest, fly] = [
                sourceRef.current.getBoundingClientRect(),
                counterRef.current.getBoundingClientRect(),
                flyingRef.current.getBoundingClientRect(),
            ];

            const flyEl = flyingRef.current;
            flyEl.innerText = `${diff > 0 ? "+" : ""}${diff}`;

            // Relative Math
            const start = {
                x: src.left + src.width / 2 - fly.left - fly.width / 2 - 15,
                y: src.top + src.height / 2 - fly.top - fly.height / 2,
            };
            const end = {
                x: dest.left + dest.width / 2 - fly.left - fly.width / 2,
                y: dest.top + dest.height / 2 - fly.top - fly.height / 2,
            };

            const tl = gsap.timeline();
            tl.set(flyEl, { ...start, scale: 0.5, opacity: 0, visibility: "visible" })
                .to(flyEl, {
                    duration: 0.6,
                    ease: "power2.out",
                    motionPath: { path: [start, { x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - 20 }, end] },
                    opacity: 1,
                    scale: 1,
                })
                .to(flyEl, { opacity: 0, scale: 0.5, duration: 0.2 }, "-=0.1")
                .to(
                    { val: startValue },
                    {
                        val: token,
                        duration: 0.4,
                        onUpdate: function () {
                            setDisplayCount(Math.floor(this.targets()[0].val));
                        },
                        onComplete: () => setDisplayCount(token),
                    },
                    "<",
                );
        },
        { dependencies: [token] },
    );

    return (
        <div className="flex items-center">
            <p ref={counterRef} className={className} {...props}>
                {displayCount}
            </p>
            <div className="relative h-0 w-0">
                <p ref={flyingRef} className={cn("invisible absolute font-bold", flyingClassName)}>
                    +0
                </p>
            </div>
        </div>
    );
};
