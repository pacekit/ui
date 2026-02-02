import { ArrowUpIcon } from "lucide-react";

import { AiModalAbilitySelector } from "@/components/gsap/ai-modal-ability-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const Demo = () => {
    return (
        <Card className="max-w-2xl grow" size="sm">
            <CardContent>
                <Textarea
                    className="h-36 resize-none appearance-none border-none bg-transparent! p-0 shadow-none ring-0!"
                    placeholder="What’s on your mind? I’ll decode it instantly 🤖"
                />
                <div className="flex items-center justify-between">
                    <AiModalAbilitySelector />
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            88
                            <p className="text-muted-foreground text-sm">/1000</p>
                        </div>
                        <Button className="text-primary-foreground size-8 cursor-pointer">
                            <ArrowUpIcon />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
