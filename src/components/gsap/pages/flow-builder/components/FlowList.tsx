"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, GripVerticalIcon, PlusIcon, TrashIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { flowPresets } from "../presets";
import { FlowBuilderHook } from "../use-flow-builder";

export const FlowList = ({ hook }: { hook: FlowBuilderHook }) => {
    const {
        flows,
        setCurrentFlow,
        moveCurrentFlow,
        deleteFlow,
        addNewFlow,
        duplicateFlow,
        updateFlowTitle,
        reorderFlows,
        selectFlowPreset,
        currentFlow,
    } = hook;

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Flows</p>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button variant="outline" className="shadow-none">
                                    Preset
                                </Button>
                            }
                        />
                        <DropdownMenuContent className="p-0">
                            <ScrollArea className="max-h-64">
                                <div className="p-1">
                                    {flowPresets.map((preset, index) => (
                                        <DropdownMenuItem key={index} onClick={() => selectFlowPreset(index)}>
                                            {preset.title}
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="mt-3 flex gap-3">
                <div>
                    <DragDropContext onDragEnd={reorderFlows}>
                        <Droppable droppableId="activated-list">
                            {(provided) => (
                                <div
                                    className="mt-2 grow space-y-2"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {flows.map((flow, i) => (
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
                                                            setCurrentFlow(flow.title);
                                                        }}
                                                        className={cn(
                                                            "bg-card hover:bg-muted flex cursor-pointer items-center gap-5 rounded border py-1 ps-3 pe-2 transition-all",
                                                            {
                                                                "bg-muted": flow.title == currentFlow,
                                                            },
                                                        )}>
                                                        <Input
                                                            className="w-24 border-none p-0 shadow-none !ring-0"
                                                            onChange={(e) => updateFlowTitle(i, e.target.value)}
                                                            value={flow.title}></Input>
                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                className="cursor-pointer shadow-none"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    duplicateFlow(i);
                                                                }}>
                                                                <CopyIcon className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                className="cursor-pointer shadow-none"
                                                                onClick={() => deleteFlow(i)}>
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
                    <div className="ms-7 mt-3">
                        <Button onClick={addNewFlow} variant="outline" className="w-full cursor-pointer shadow-none">
                            <PlusIcon className="size-4" />
                            Add
                        </Button>
                    </div>
                </div>

                <div className="mt-2 flex flex-col items-center gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer shadow-none"
                        onClick={() => moveCurrentFlow("up")}>
                        <ArrowUpIcon className="size-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        className="cursor-pointer shadow-none"
                        onClick={() => moveCurrentFlow("down")}>
                        <ArrowDownIcon className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
