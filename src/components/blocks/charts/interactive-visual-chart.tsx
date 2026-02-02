"use client";

import { useEffect, useState } from "react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const chartData = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);
    date.setDate(date.getDate() + i);

    return {
        date: date.toISOString().split("T")[0],
        item1: Math.floor(Math.random() * 500) + 50,
        item2: Math.floor(Math.random() * 500) + 50,
    };
});

const chartConfig: ChartConfig = {
    item1: {
        label: "Item 1",
        color: "var(--chart-1)",
    },
    item2: {
        label: "Item 2",
        color: "var(--chart-2)",
    },
};

export const InteractiveVisualChart = () => {
    const isMobile = useIsMobile();
    const [timeRange, setTimeRange] = useState<string | null>("90d");

    useEffect(() => {
        if (isMobile) {
            setTimeRange("7d");
        }
    }, [isMobile]);
    const filteredData = chartData.slice(timeRange === "7d" ? -7 : timeRange == "30d" ? -30 : -90);

    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Total Visitors</CardTitle>
                <CardDescription>
                    <span>Total for the last 3 months</span>
                </CardDescription>
                <CardAction>
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger
                            className="flex w-24 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate sm:w-28 xl:w-40"
                            size="sm"
                            aria-label="Select a value">
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="90d" className="rounded-lg">
                                Last 3 months
                            </SelectItem>
                            <SelectItem value="30d" className="rounded-lg">
                                Last 30 days
                            </SelectItem>
                            <SelectItem value="7d" className="rounded-lg">
                                Last 7 days
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
                    <AreaChart data={filteredData}>
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
                        <defs>
                            <linearGradient id="fillItem1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-item1)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-item1)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillItem2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-item2)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-item2)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="item1"
                            type="natural"
                            fill="url(#fillItem1)"
                            stroke="var(--color-item1)"
                            stackId="a"
                        />
                        <Area
                            dataKey="item2"
                            type="natural"
                            fill="url(#fillItem2)"
                            stroke="var(--color-item2)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
