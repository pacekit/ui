"use client";

import { ComponentProps, useId, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

// Ensure plugins are registered globally
if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase, CustomBounce, SplitText);
}

type SquashTextProps = {
    repeat?: boolean | number;
} & ComponentProps<"div">;

export const SquashText = ({ repeat = true, children, ...props }: SquashTextProps) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const bounceId = useId();

    // We sanitize the IDs for GSAP ease names
    const bounceEase = `bounce${bounceId.replace(/:/g, "")}`;
    const squashEase = `squash${bounceId.replace(/:/g, "")}`;

    useGSAP(
        () => {
            if (!wrapperRef.current) return;

            // 1. Create the Custom Bounce
            CustomBounce.create(bounceEase, {
                strength: 0.6,
                squash: 1,
                squashID: squashEase,
            });

            // 2. Initialize SplitText
            const split = new SplitText(wrapperRef.current, { type: "chars" });
            const chars = split.chars;

            // 3. Create Timeline
            const tl = gsap.timeline({
                defaults: { duration: 1.5, stagger: { amount: 0.1, ease: "sine.in" } },
                repeat: repeat === true ? -1 : repeat === false ? 0 : repeat,
            });

            tl.from(
                chars,
                {
                    duration: 0.6,
                    opacity: 0,
                    ease: "power1.inOut",
                },
                0,
            )
                .from(
                    chars,
                    {
                        y: -100,
                        ease: bounceEase,
                    },
                    0,
                )
                .to(
                    chars,
                    {
                        scaleX: 1.5,
                        scaleY: 0.8,
                        rotate: () => 15 - 30 * Math.random(),
                        ease: squashEase,
                        transformOrigin: "50% 100%",
                    },
                    0,
                );

            // Cleanup: Revert the split text when component unmounts
            return () => {
                split.revert();
            };
        },
        { scope: wrapperRef, dependencies: [repeat] },
    );

    return (
        <div {...props} ref={wrapperRef}>
            {children}
        </div>
    );
};
