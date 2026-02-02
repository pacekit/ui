"use client";

import { ComponentProps, ReactNode, useMemo, useState } from "react";

import {
    BrainIcon,
    CodeIcon,
    EyeIcon,
    FileSearch2Icon,
    LanguagesIcon,
    LayersIcon,
    SpeechIcon,
    VariableIcon,
    VideoIcon,
    Wand2Icon,
    WrenchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Swap } from "@/components/gsap/swap";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ModalCapability =
    | "vision"
    | "thinking"
    | "code"
    | "speech"
    | "search"
    | "tools"
    | "multimodal"
    | "video"
    | "math"
    | "multilingual"
    | "creativity";

export type ModalOption = {
    value: string;
    image: string;
    name: string;
    darkInvertImage?: boolean;
    description: string;
    capabilities: ModalCapability[];
};

type ModalSelectorProps = ComponentProps<typeof Button> & {
    showCapabilities?: boolean;
    showDescription?: boolean;
};

const modals: ModalOption[] = [
    {
        value: "openai-gpt-4o",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg",
        name: "GPT-4o",
        darkInvertImage: true,
        description: "Omni model supporting seamless text, audio, and vision integration.",
        capabilities: ["vision", "code", "speech", "tools", "multimodal"],
    },
    {
        value: "google-gemini-2-0-pro",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemini-color.svg",
        name: "Gemini 2.0 Pro",
        description: "Next-generation performance with ultra-long context windows.",
        capabilities: ["vision", "thinking", "speech", "tools", "video"],
    },
    {
        value: "anthropic-claude-3-5-sonnet",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/claude-color.svg",
        name: "Claude 3.5 Sonnet",
        description: "Industry-leading intelligence with a focus on coding and nuance.",
        capabilities: ["thinking", "code", "vision", "tools"],
    },
    {
        value: "xai-grok-3",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/grok.svg",
        name: "Grok-3",
        darkInvertImage: true,
        description: "Real-time information processing with enhanced logical reasoning.",
        capabilities: ["thinking", "search", "code"],
    },
    {
        value: "deepseek-v3",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/deepseek-color.svg",
        name: "DeepSeek-V3",
        description: "High-performance Mixture-of-Experts model for advanced logic.",
        capabilities: ["thinking", "code", "math"],
    },
    {
        value: "meta-llama-3-1-405b",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/meta-color.svg",
        name: "Llama 3.1 (405B)",
        description: "The premier open-source model for complex reasoning and scale.",
        capabilities: ["thinking", "code", "tools"],
    },
    {
        value: "mistral-large-latest",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/mistral-color.svg",
        name: "Mistral Large",
        description: "European powerhouse optimized for multilingual reasoning.",
        capabilities: ["thinking", "code", "multilingual"],
    },
    {
        value: "stability-sd3-ultra",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/stability-color.svg",
        name: "Stable Diffusion 3 Ultra",
        description: "State-of-the-art text-to-image with superior prompt adherence.",
        capabilities: ["vision", "creativity"],
    },
    {
        value: "midjourney-v6-1",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/midjourney.svg",
        name: "Midjourney v6.1",
        darkInvertImage: true,
        description: "Highly aesthetic and photorealistic image generation.",
        capabilities: ["vision", "creativity"],
    },
    {
        value: "perplexity-sonar-pro",
        image: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/perplexity-color.svg",
        name: "Sonar Pro",
        description: "Search-centric model designed for cited, real-time factual answers.",
        capabilities: ["search", "thinking"],
    },
];

const CapabilityBadge = ({ capability }: { capability: ModalCapability }) => {
    const styles: Record<ModalCapability, { color: string; text: string; icon: ReactNode }> = {
        thinking: {
            color: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-500",
            text: "Thinking",
            icon: <BrainIcon className="size-4.5" />,
        },
        code: {
            color: "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500",
            text: "Code",
            icon: <CodeIcon className="size-4.5" />,
        },
        vision: {
            color: "bg-green-500/10 hover:bg-green-500/20 text-green-500",
            text: "Vision",
            icon: <EyeIcon className="size-4.5" />,
        },
        creativity: {
            color: "bg-orange-500/10 hover:bg-orange-500/20 text-orange-500",
            text: "Creativity",
            icon: <Wand2Icon className="size-4.5" />,
        },
        search: {
            color: "bg-teal-500/10 hover:bg-teal-500/20 text-teal-500",
            text: "Search",
            icon: <FileSearch2Icon className="size-4.5" />,
        },
        speech: {
            color: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-500",
            text: "Speech",
            icon: <SpeechIcon className="size-4.5" />,
        },
        tools: {
            color: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500",
            text: "Tools",
            icon: <WrenchIcon className="size-4.5" />,
        },
        video: {
            color: "bg-rose-500/10 hover:bg-rose-500/20 text-rose-500",
            text: "Video",
            icon: <VideoIcon className="size-4.5" />,
        },
        multilingual: {
            color: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-500",
            text: "Global",
            icon: <LanguagesIcon className="size-4.5" />,
        },
        multimodal: {
            color: "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500",
            text: "Multimodal",
            icon: <LayersIcon className="size-4.5" />,
        },
        math: {
            color: "bg-slate-500/10 hover:bg-slate-500/20 text-slate-500",
            text: "Math",
            icon: <VariableIcon className="size-4.5" />,
        },
    };

    const defaultStyle = {
        color: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-500",
        text: "Thinking",
        icon: <BrainIcon className="size-4.5" />,
    };

    const { color, text, icon } = styles[capability] ?? defaultStyle;

    return (
        <Tooltip>
            <TooltipTrigger render={<div className={cn("rounded p-1", color)}>{icon}</div>}></TooltipTrigger>
            <TooltipContent>
                <p>{text}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export const AiModalSelector = ({
    showDescription = true,
    showCapabilities = true,
    variant = "outline",
    className,
    ...props
}: ModalSelectorProps) => {
    const [selectedModal, setSelectedModal] = useState(modals[0].value);

    const selectedModalItem = useMemo(() => {
        return modals.find((item) => item.value === selectedModal) ?? modals[0];
    }, [selectedModal]);

    return (
        <TooltipProvider>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            {...props}
                            variant={variant}
                            className={cn("cursor-pointer overflow-hidden shadow-none select-none", className)}>
                            <Swap state={selectedModalItem} effects={["blur", "slideDown", "opacity"]}>
                                {(state) => (
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src={state.image}
                                            className={cn("min-w-4.5", { "dark:invert": state.darkInvertImage })}
                                            alt={`${state.name} logo`}
                                        />
                                        <p className="text-base overflow-ellipsis">{state.name}</p>
                                        {showCapabilities && (
                                            <div className="flex items-center gap-1.5">
                                                {state.capabilities.map((capability) => (
                                                    <CapabilityBadge capability={capability} key={capability} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Swap>
                        </Button>
                    }></DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 shadow-xs transition-all hover:shadow-md" align="start">
                    <ScrollArea className="h-80">
                        <div className="space-y-0.5">
                            {modals.map((item) => (
                                <DropdownMenuItem
                                    key={item.value}
                                    onClick={() => setSelectedModal(item.value)}
                                    className={cn("group relative cursor-pointer gap-3", {
                                        "bg-accent": selectedModal === item.value,
                                    })}>
                                    <img
                                        src={item.image}
                                        alt={`${item.name} logo`}
                                        className={cn("size-6", {
                                            "dark:invert": item.darkInvertImage,
                                        })}
                                    />
                                    <div className="grow">
                                        <div className="flex items-center gap-2">
                                            <p className="grow text-base/none font-medium">{item.name}</p>
                                        </div>
                                        {showDescription && (
                                            <p className="text-muted-foreground mt-0.5 line-clamp-1">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                    {showCapabilities && (
                                        <div className="absolute end-0 flex translate-x-5 scale-90 items-center gap-1.5 rounded bg-inherit px-2.5 py-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100">
                                            {item.capabilities.map((capability) => (
                                                <CapabilityBadge capability={capability} key={capability} />
                                            ))}
                                        </div>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </ScrollArea>
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    );
};
