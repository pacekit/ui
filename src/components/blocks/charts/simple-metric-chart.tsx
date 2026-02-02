"use client";

import { UsersIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    date.setDate(date.getDate() + i);

    return {
        date: date.toISOString().split("T")[0],
        item1: Math.floor(Math.random() * 500) + 50,
    };
});

const chartConfig: ChartConfig = {
    item1: {
        label: "Item 1",
        color: "var(--chart-1)",
    },
};

export const SimpleMetricChart = () => {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                    <UsersIcon className="size-4" />
                    <p>Audience Reach</p>
                </CardTitle>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillItem1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-item1)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-item1)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="item1"
                            type="natural"
                            fill="url(#fillItem1)"
                            stroke="var(--color-item1)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
