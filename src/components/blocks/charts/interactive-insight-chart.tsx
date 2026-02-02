"use client";

import {
    ArrowDownToLineIcon,
    FileJsonIcon,
    MoreHorizontalIcon,
    RefreshCwIcon,
    SettingsIcon,
    Share2Icon,
} from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const chartData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    date.setDate(date.getDate() + i);

    return {
        date: date.toISOString().split("T")[0],
        item1: Math.floor(Math.random() * 500) + 50,
        item2: Math.floor(Math.random() * 500) + 50,
    };
});

const chartConfig: ChartConfig = {
    visitors: {
        label: "Visitors",
    },
    item1: {
        label: "Item 1",
        color: "var(--chart-1)",
    },

    item2: {
        label: "Item 2",
        color: "var(--chart-2)",
    },
};

export const InteractiveInsightChart = () => {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Real-time insights for the last 30 days</CardDescription>
                <CardAction className="">
                    <Button variant="ghost" size="icon-sm" className="max-sm:hidden" aria-label="Refresh">
                        <RefreshCwIcon />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="max-sm:hidden" aria-label="Download">
                        <ArrowDownToLineIcon />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="ghost" size="icon-sm">
                                    <MoreHorizontalIcon />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            }></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <SettingsIcon />
                                    <span>Configure</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <RefreshCwIcon />
                                    <span>Refresh Data</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <ArrowDownToLineIcon />
                                    <span>Export as PNG</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <FileJsonIcon />
                                    <span>Export CSV</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Share2Icon />
                                    <span>Share Chart</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardAction>
                <div className="mt-4 flex items-center gap-6">
                    <div className="space-y-1.5">
                        <p className="text-muted-foreground text-sm font-medium">Revenue</p>
                        <p className="text-lg leading-none font-bold sm:text-2xl">$12,345</p>
                    </div>
                    <div className="bg-border h-10 w-px"></div>
                    <div className="space-y-1.5">
                        <p className="text-muted-foreground text-sm font-medium whitespace-nowrap">Avg. Order</p>
                        <p className="text-lg leading-none font-bold sm:text-2xl">$248</p>
                    </div>
                    <div className="bg-border h-10 w-px max-sm:hidden"></div>
                    <div className="space-y-1.5 max-sm:hidden">
                        <p className="text-muted-foreground text-sm font-medium">Conversion</p>
                        <p className="text-lg leading-none font-bold sm:text-2xl">+7.2%</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
                    <LineChart data={chartData}>
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
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={4}
                            width={35}
                            className="text-sm sm:text-xs"
                            tickFormatter={(value) => `${value}`}
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
                        <Line dataKey="item1" type="natural" dot={false} stroke="var(--color-item1)" />
                        <Line dataKey="item2" dot={false} type="natural" stroke="var(--color-item2)" />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
