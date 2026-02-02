import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
    title: string;
    value: string | number;
    trendValue: number;
    footerLabel: string;
    footerSubtext: string;
};

export const RichMetricStat = ({ title, value, trendValue, footerLabel, footerSubtext }: Props) => {
    const isPositive = trendValue > 0;
    const isNeutral = trendValue === 0;

    const Icon = isNeutral ? MinusIcon : isPositive ? TrendingUpIcon : TrendingDownIcon;

    const trendClass = isNeutral
        ? "text-foreground bg-muted"
        : isPositive
          ? "text-success border-success/20 bg-success/10"
          : "text-destructive border-destructive/20 bg-destructive/10";

    const formattedTrend = isNeutral ? "0%" : `${isPositive ? "+" : ""}${trendValue}%`;

    return (
        <Card className="@container/card">
            <CardHeader className="flex items-start justify-between gap-2">
                <div>
                    <CardDescription className="font-medium">{title}</CardDescription>
                    <CardTitle className="text-2xl font-bold @[600px]/card:text-4xl @[800px]/card:text-5xl">
                        {value}
                    </CardTitle>
                </div>
                <Badge variant="outline" className={cn("gap-1 px-1.5 py-0.5", trendClass)}>
                    <Icon className="size-3" />
                    {formattedTrend}
                </Badge>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex items-center gap-1.5 font-medium">
                    <span className={isNeutral ? "" : isPositive ? "text-success" : "text-destructive"}>
                        {footerLabel}
                    </span>
                    <Icon
                        className={cn(
                            "size-3.5",
                            isNeutral ? "text-muted-foreground" : isPositive ? "text-success" : "text-destructive",
                        )}
                    />
                </div>
                <div className="text-muted-foreground text-xs">{footerSubtext}</div>
            </CardFooter>
        </Card>
    );
};
