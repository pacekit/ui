"use client";

import { useState } from "react";

import { PauseIcon, PlayIcon } from "lucide-react";

import { DotLoader } from "@/components/gsap/dot-loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const exampleFrames = [
    {
        title: "Arrow",
        frames: [
            [3, 10, 24, 17, 31, 38, 45, 39, 33, 37, 29],
            [10, 17, 31, 24, 38, 45, 46, 40, 44, 36],
            [17, 24, 38, 31, 45, 47, 43],
            [24, 31, 45, 38],
            [31, 38, 45],
            [38, 45],
            [45],
            [3],
            [3, 10, 4, 2],
            [3, 10, 17, 11, 5, 9, 1],
            [3, 10, 17, 24, 18, 12, 16, 8],
            [10, 3, 17, 24, 31, 25, 19, 23, 15],
            [3, 17, 10, 24, 31, 38, 32, 26, 30, 22],
        ],
    },
    {
        title: "Game",
        frames: [
            [14, 7, 0, 8, 6, 13, 20],
            [14, 7, 13, 20, 16, 27, 21],
            [14, 20, 27, 21, 34, 24, 28],
            [27, 21, 34, 28, 41, 32, 35],
            [34, 28, 41, 35, 48, 40, 42],
            [34, 28, 41, 35, 48, 42, 46],
            [34, 28, 41, 35, 48, 42, 38],
            [34, 28, 41, 35, 48, 30, 21],
            [34, 28, 41, 48, 21, 22, 14],
            [34, 28, 41, 21, 14, 16, 27],
            [34, 28, 21, 14, 10, 20, 27],
            [28, 21, 14, 4, 13, 20, 27],
            [28, 21, 14, 12, 6, 13, 20],
            [28, 21, 14, 6, 13, 20, 11],
            [28, 21, 14, 6, 13, 20, 10],
            [14, 6, 13, 20, 9, 7, 21],
        ],
    },
    {
        title: "Heart",
        frames: [
            [24],
            [17, 30, 16, 23, 24, 31, 32, 25, 18],
            [39, 33, 37, 29, 17, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
            [45, 39, 33, 27, 20, 37, 29, 21, 14, 8, 12, 9, 17, 11, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
            [45, 39, 33, 27, 20, 37, 29, 21, 14, 8, 12, 9, 17, 11, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
            [45, 39, 33, 27, 20, 37, 29, 21, 14, 8, 12, 9, 17, 11, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
            [45, 39, 33, 27, 20, 37, 29, 21, 14, 8, 12, 9, 17, 11, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
            [45, 39, 33, 27, 20, 37, 29, 21, 14, 8, 12, 9, 17, 11, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
            [39, 33, 37, 29, 17, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
            [17, 30, 16, 23, 24, 31, 32, 25, 18],
            [24],
        ],
    },
    {
        title: "Circle",
        frames: [[24], [23, 31, 25, 17], [11, 19, 33, 39, 37, 29, 15, 9], [3, 1, 7, 21, 35, 43, 45, 47, 41, 27, 13, 5]],
    },
    {
        title: "Square",
        frames: [
            [24],
            [17, 18, 25, 32, 31, 30, 23, 16],
            [10, 11, 12, 19, 26, 33, 40, 39, 38, 37, 36, 29, 22, 15, 8, 9],
            [0, 2, 1, 3, 4, 5, 6, 13, 20, 27, 34, 41, 48, 47, 46, 45, 44, 43, 42, 35, 28, 21, 14, 7],
        ],
    },
    {
        title: "Water",
        frames: [
            [7, 15, 23, 31, 39, 47, 46, 44, 45, 38, 37, 30, 29, 22, 14, 21, 28, 36, 43, 42, 35],
            [16, 24, 32, 40, 48, 47, 45, 46, 39, 38, 31, 30, 23, 15, 22, 29, 37, 44, 43, 36, 42, 35, 28, 14, 21],
            [33, 41, 48, 46, 47, 40, 39, 32, 31, 24, 23, 30, 38, 45, 44, 37, 43, 36, 29, 22, 42, 35, 28, 21],
            [34, 47, 48, 41, 40, 33, 32, 31, 39, 46, 45, 38, 44, 37, 30, 43, 36, 29, 42, 35, 28],
            [48, 41, 34, 33, 32, 40, 47, 46, 39, 45, 38, 31, 44, 37, 30, 43, 36, 29, 27, 42],
            [34, 33, 41, 48, 47, 40, 46, 39, 32, 45, 38, 31, 44, 37, 43, 27, 42, 36, 20, 26],
            [34, 48, 41, 47, 40, 33, 46, 39, 32, 45, 38, 31, 44, 43, 37, 27, 20, 13, 26, 19, 25],
            [34, 48, 41, 47, 40, 33, 46, 39, 32, 45, 38, 31, 44, 43, 37, 27, 20, 13, 26, 19, 25],
            [34, 33, 41, 48, 47, 40, 46, 39, 32, 45, 38, 31, 44, 37, 43, 27, 42, 36, 20, 26],
            [48, 41, 34, 33, 32, 40, 47, 46, 39, 45, 38, 31, 44, 37, 30, 43, 36, 29, 27, 42],
            [34, 47, 48, 41, 40, 33, 32, 31, 39, 46, 45, 38, 44, 37, 30, 43, 36, 29, 42, 35, 28],
            [33, 41, 48, 46, 47, 40, 39, 32, 31, 24, 23, 30, 38, 45, 44, 37, 43, 36, 29, 22, 42, 35, 28, 21],
            [16, 24, 32, 40, 48, 47, 45, 46, 39, 38, 31, 30, 23, 15, 22, 29, 37, 44, 43, 36, 42, 35, 28, 14, 21],
            [7, 15, 23, 31, 39, 47, 46, 44, 45, 38, 37, 30, 29, 22, 14, 21, 28, 36, 43, 42, 35],
        ],
    },
    {
        title: "Cross",
        frames: [
            [6, 48, 0, 42],
            [12, 6, 40, 48, 8, 0, 36, 42],
            [18, 12, 6, 32, 40, 48, 16, 8, 0, 30, 36, 42],
            [24, 18, 12, 6, 32, 40, 48, 16, 8, 0, 30, 36, 42],
            [],
        ],
    },
    {
        title: "Cube",
        frames: [[24], [18, 30], [8, 26, 36], [8, 12, 40, 36], [8, 36, 40, 12, 24], [40, 26, 12, 8, 22, 36]],
    },
];

export const Demo = () => {
    const [selectedFrameIndex, setSelectedFrameIndex] = useState(0);
    const [duration, setDuration] = useState(150);
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="flex flex-wrap gap-4 sm:gap-6 xl:gap-10">
            <div className="bg-card h-fit items-center gap-4 rounded p-4 shadow sm:p-6">
                <DotLoader
                    frames={exampleFrames[selectedFrameIndex].frames}
                    duration={duration}
                    className="gap-0.5"
                    isPlaying={isPlaying}
                    dotClassName="bg-foreground/10 [&.active]:bg-foreground size-2.5"></DotLoader>
            </div>
            <div className="bg-card space-y-2 rounded p-5 shadow">
                <Label>Select Preset</Label>
                <Select
                    value={selectedFrameIndex.toString()}
                    onValueChange={(e) => e && setSelectedFrameIndex(parseInt(e))}>
                    <SelectTrigger className="mt-1 w-48">
                        <SelectValue placeholder="Select a category">
                            {exampleFrames[selectedFrameIndex]?.title || "Loading..."}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {exampleFrames.map((exampleFrame, index) => (
                            <SelectItem value={index.toString()} key={index}>
                                {exampleFrame.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Label>
                    Duration <span className="opacity-70">({duration} ms)</span>
                </Label>
                <Slider
                    className="mt-2"
                    value={duration}
                    onValueChange={(e) => setDuration(typeof e === "number" ? e : e[0])}
                    max={1000}
                    min={10}
                    step={10}
                />
                <div className="flex items-center justify-center">
                    <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="mt-4 cursor-pointer shadow-none"
                        variant="outline">
                        {isPlaying ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
                        {isPlaying ? "Pause" : "Play"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
