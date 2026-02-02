import { ArrowDownRightIcon, ArrowUpRightIcon, MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SimpleMetricStatProps {
    title: string;
    value: string | number;
    changeValue: string | number;
    direction?: "up" | "down" | "neutral";
}

export const SimpleMetricStat = ({ title, value, changeValue, direction = "up" }: SimpleMetricStatProps) => {
    const variants = {
        up: {
            Icon: ArrowUpRightIcon,
            color: "text-success",
        },
        down: {
            Icon: ArrowDownRightIcon,
            color: "text-destructive",
        },
        neutral: {
            Icon: MinusIcon,
            color: "text-muted-foreground",
        },
    };

    const { Icon, color } = variants[direction];

    return (
        <Card className="@container/card">
            <CardHeader className="flex items-start justify-between gap-2">
                <div>
                    <CardDescription className="font-medium">{title}</CardDescription>
                    <CardTitle className="text-2xl font-bold @[600px]/card:text-4xl @[800px]/card:text-5xl">
                        {value}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardFooter className={cn("flex-row items-center gap-1 text-sm font-medium", color)}>
                <Icon className="size-4" />
                <span>{changeValue}</span>
            </CardFooter>
        </Card>
    );
};
