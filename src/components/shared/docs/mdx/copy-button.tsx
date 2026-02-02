import { useState } from "react";

import { CheckIcon, ClipboardIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const CopyButton = ({ text, className }: { text: string; className?: string }) => {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Tooltip open={open || copied} onOpenChange={setOpen}>
            <TooltipTrigger
                render={
                    <Button size="icon-sm" variant="ghost" onClick={copyToClipboard} className={className}>
                        <ClipboardIcon
                            className={cn("absolute transition-all duration-300", {
                                "scale-50 opacity-0": copied,
                            })}
                        />
                        <CheckIcon
                            className={cn("absolute scale-50 opacity-0 transition-all duration-300", {
                                "scale-100 opacity-100": copied,
                            })}
                        />
                    </Button>
                }></TooltipTrigger>
            <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
        </Tooltip>
    );
};
