"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, GripVerticalIcon, PlusIcon, TrashIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { FlowBuilderHook } from "../use-flow-builder";

export const FrameList = ({ hook }: { hook: FlowBuilderHook }) => {
    const {
        totalDots,
        frames,
        currentFrame,
        deleteFrame,
        duplicateFrame,
        reorderFrames,
        setCurrentFrame,
        addNewFrame,
        moveCurrentFrame,
    } = hook;

    return (
        <div className="w-58">
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Frames</p>
                <div className="itec-center flex gap-3">
                    <Button onClick={addNewFrame} variant="outline" className="cursor-pointer shadow-none">
                        <PlusIcon className="size-4" />
                        Add
                    </Button>
                </div>
            </div>
            <div className="mt-3 flex gap-3">
                <DragDropContext onDragEnd={reorderFrames}>
                    <Droppable droppableId="activated-list">
                        {(provided) => (
                            <div className="mt-2 grow space-y-2" ref={provided.innerRef} {...provided.droppableProps}>
                                {frames.map((frame, i) => (
                                    <Draggable key={i} draggableId={`item-${i}`} index={i}>
                                        {(draggableProvided) => (
                                            <div
                                                ref={draggableProvided.innerRef}
                                                {...draggableProvided.draggableProps}
                                                className="flex items-center gap-2">
                                                <div {...draggableProvided.dragHandleProps} className="cursor-grab">
                                                    <GripVerticalIcon className="size-5 opacity-50" />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setCurrentFrame(i);
                                                    }}
                                                    className={cn(
                                                        "bg-card hover:bg-muted flex cursor-pointer items-center gap-5 rounded border px-2 py-1 transition-all",
                                                        {
                                                            "bg-muted": i == currentFrame,
                                                        },
                                                    )}>
                                                    <div className="grid w-fit grid-cols-7 gap-px">
                                                        {Array.from({ length: totalDots }).map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={cn("bg-foreground/10 size-1 rounded-xs", {
                                                                    "bg-foreground/60": frame.includes(i),
                                                                })}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="cursor-pointer shadow-none"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                duplicateFrame(i);
                                                            }}>
                                                            <CopyIcon className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            className="cursor-pointer shadow-none"
                                                            onClick={() => deleteFrame(i)}>
                                                            <TrashIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="mt-2 flex flex-col items-center gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer shadow-none"
                        onClick={() => moveCurrentFrame("up")}>
                        <ArrowUpIcon className="size-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer shadow-none"
                        onClick={() => moveCurrentFrame("down")}>
                        <ArrowDownIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
