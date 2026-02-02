"use client";

import { ComponentProps, ReactNode, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { cn } from "@/lib/utils";

type HoverProfileCardProps = Omit<ComponentProps<"div">, "content"> & {
    trigger?: ReactNode;
    content?: ReactNode;
};

export const ProfilePeek = ({ trigger, content, className, ...props }: HoverProfileCardProps) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const component = componentRef.current;
            const card = cardRef.current;
            const content = contentRef.current;
            const trigger = triggerRef.current;
            if (!component || !card || !content || !trigger) return;

            const timeline = gsap.timeline({
                paused: true,
                defaults: { ease: "power2.inOut", duration: 0.4 },
            });

            gsap.set(card, {
                opacity: 0,
                scale: 0.9,
                y: -40,
                rotationX: -25,
                rotationY: 25,
                transformOrigin: "top left",
            });

            gsap.set(content, { y: -10, opacity: 0, display: "none" });

            timeline
                .to(content, {
                    display: "block",
                    duration: 0,
                })
                .to(component, {
                    zIndex: 10,
                    duration: 0,
                })
                .to(card, {
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    left: -16,
                    top: -16,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(3)",
                })
                .to(
                    triggerRef.current,
                    {
                        scale: 1.1,
                        duration: 0.4,
                    },
                    "<",
                )
                .to(
                    content,
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.3,
                    },
                    "-=0.4",
                );

            const onMouseEnter = () => {
                timeline.play();
            };

            const onMouseLeave = () => {
                timeline.reverse();
            };

            trigger.addEventListener("mouseenter", onMouseEnter);
            component.addEventListener("mouseleave", onMouseLeave);

            return () => {
                trigger.removeEventListener("mouseenter", onMouseEnter);
                component.removeEventListener("mouseleave", onMouseLeave);
            };
        },
        { scope: componentRef },
    );

    return (
        <div {...props} ref={componentRef} className={cn("relative z-0 perspective-midrange", className)}>
            <div ref={cardRef} className="absolute transform-3d">
                <div ref={contentRef} style={{ display: "none" }}>
                    {content}
                </div>
            </div>

            <div className="relative" ref={triggerRef}>
                {trigger}
            </div>
        </div>
    );
};
