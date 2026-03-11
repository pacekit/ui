"use client";

import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDownIcon, RulerDimensionLineIcon, ShoppingCartIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { SpringButton } from "@/components/gsap/spring-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const ProductDemo = () => {
    const [infoVisible, setInfoVisible] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP();

    const toggleProductInfo = contextSafe(() => {
        const content = contentRef.current;
        if (!content) return;

        const showContent = () => {
            gsap.set(content, {
                display: "block",
                height: "auto",
            });
            const height = content.offsetHeight;
            gsap.fromTo(
                content,
                {
                    height: 0,
                    opacity: 0,
                    filter: "blur(4px)",
                },
                {
                    height,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.9,
                    ease: "expo.out",
                },
            );
        };

        const hideContent = () => {
            gsap.to(content, {
                height: 0,
                opacity: 0,
                filter: "blur(4px)",
                duration: 0.6,
                ease: "circ.in",
                onComplete: () => {
                    gsap.set(content, { display: "none" });
                },
            });
        };

        if (infoVisible) {
            hideContent();
        } else {
            showContent();
        }
        setInfoVisible(!infoVisible);
    });

    return (
        <div className="group w-64 cursor-pointer">
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1589810635657-232948472d98?w=1000"
                    alt="Shirt"
                    className="h-72 w-full rounded-md object-cover"
                />
                <div
                    className={cn(
                        "bg-background/50 absolute inset-x-1 bottom-1 rounded-md backdrop-blur-xs transition-all",
                        {
                            "bg-background/80": infoVisible,
                        },
                    )}>
                    <div
                        className={cn(
                            "hover:bg-background/70 flex items-start justify-between transition-all duration-500",
                            {
                                "rounded-t-md px-3 py-1.5": infoVisible,
                                "rounded-md px-2.5 py-1": !infoVisible,
                            },
                        )}
                        role="button"
                        aria-expanded={infoVisible}
                        tabIndex={0}
                        onClick={toggleProductInfo}>
                        <div>
                            <p className="mt-1 line-clamp-1 leading-none font-medium transition-all duration-500 max-sm:text-sm">
                                Classic White Tee
                            </p>
                            <p>
                                <sup className="text-muted-foreground">$</sup>
                                <span className="text-xl font-medium transition-all duration-500">29</span>
                            </p>
                        </div>
                        <div className="bg-background mt-1 rounded-full p-0.5">
                            <ChevronDownIcon
                                className={cn("text-muted-foreground size-4 transition-all duration-500", {
                                    "rotate-180": infoVisible,
                                })}
                            />
                        </div>
                    </div>
                    <div ref={contentRef} className="hidden overflow-hidden">
                        <div className="p-3 pt-0">
                            <div className="flex items-center justify-between">
                                <p className="text-foreground/60 text-sm font-medium">Sizes</p>
                                <div className="text-foreground/80 flex items-center gap-1.5 text-xs">
                                    <RulerDimensionLineIcon className="size-4" />
                                    <p>Chart</p>
                                </div>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5">
                                <div className="rounded border px-1 py-px text-sm">Small</div>
                                <div className="rounded border px-1 py-px text-sm">Medium</div>
                                <div className="bg-foreground/10 rounded border px-1 py-px text-sm opacity-60 grayscale-50">
                                    Large
                                </div>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-foreground/60 text-sm font-medium">Colors</p>
                                <p className="text-foreground/80 text-xs hover:underline">Custom color?</p>
                            </div>
                            <TooltipProvider>
                                <div className="mt-1 flex items-center gap-1.5">
                                    <Tooltip>
                                        <TooltipTrigger
                                            className="cursor-pointer"
                                            render={
                                                <div className="size-5 rounded-full bg-red-500 shadow-xs"></div>
                                            }></TooltipTrigger>
                                        <TooltipContent>Red</TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger
                                            className="cursor-pointer"
                                            render={
                                                <div className="size-5 rounded-full bg-teal-500 shadow-xs"></div>
                                            }></TooltipTrigger>
                                        <TooltipContent>Teal</TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger
                                            className="cursor-pointer"
                                            render={
                                                <div className="size-5 rounded-full bg-blue-400 opacity-40 shadow-xs grayscale-25"></div>
                                            }></TooltipTrigger>
                                        <TooltipContent>Blue (Not available)</TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger
                                            className="cursor-pointer"
                                            render={
                                                <div className="size-5 rounded-full bg-pink-500 shadow-xs"></div>
                                            }></TooltipTrigger>
                                        <TooltipContent>Pink</TooltipContent>
                                    </Tooltip>
                                </div>
                            </TooltipProvider>
                            <div className="mt-3 flex items-end justify-between">
                                <p className="text-muted-foreground text-xs">Available in stock</p>
                                <SpringButton
                                    scale={0.95}
                                    shaking={false}
                                    className="bg-primary text-primary-foreground flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm font-medium">
                                    <ShoppingCartIcon className="size-4" />
                                    Add
                                </SpringButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -start-18 bottom-2">
                    <svg className="fill-foreground/50 h-16 -scale-x-100 rotate-30" viewBox="0 0 511 464">
                        <path d="M483.438 197.118C487.34 228.965 466.778 259.114 443.695 278.934C418.138 300.978 386.514 314.879 353.207 320.38C285.833 331.851 218.728 310.303 158.478 281.734C120.963 263.965 85.3952 242.55 51.5793 218.308C48.4395 216.049 48.7277 210.28 51.0453 207.802C53.9668 204.604 58.4111 205.01 61.5509 207.269C90.2183 227.694 120.287 245.858 151.758 261.76C180.558 276.162 210.155 289.025 241.134 297.89C301.394 314.57 368.951 314.17 421.883 277C446.78 259.557 472.351 230.165 468.234 197.402C467.881 193.426 471.718 190.013 475.441 189.815C480.236 189.655 483.084 193.142 483.438 197.118Z" />
                        <path d="M66.8645 331.562C60.385 293.266 53.9054 254.97 47.4259 216.674C46.0557 208.781 42.8711 198.511 50.5076 192.756C54.2478 189.751 59.0426 189.592 63.8964 190.095C68.7501 190.598 73.3506 191.258 78.3604 192.014C97.6783 194.437 116.899 197.268 136.217 199.691C157.991 202.696 179.609 205.448 201.383 208.454C205.321 209.172 207.722 213.634 206.847 217.318C205.876 221.412 201.921 223.501 197.983 222.782C162.563 218.052 127.144 213.322 92.1336 208.689C83.0887 207.623 74.141 206.149 65.0962 205.083C64.0241 205.045 61.3735 205.281 60.2425 204.58C59.2676 204.132 60.1453 204.989 60.3397 204.171C60.6104 201.208 61.0995 203.702 61.0995 203.702C61.2556 203.955 61.6093 207.931 61.7654 208.185C62.2545 210.679 62.5875 212.921 63.0766 215.415C66.091 232.78 68.852 250.301 72.0225 267.919C75.5259 287.778 78.776 307.794 82.2795 327.653C83.0426 331.726 81.2522 335.626 77.0819 336.798C72.5993 337.464 67.4715 335.382 66.8645 331.562Z" />
                    </svg>
                </div>
                <div className="absolute -inset-s-20 bottom-16">
                    <p className="text-muted-foreground text-sm font-medium">Toggle</p>
                </div>
            </div>
        </div>
    );
};
