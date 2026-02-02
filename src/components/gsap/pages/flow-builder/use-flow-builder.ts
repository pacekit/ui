"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DropResult } from "@hello-pangea/dnd";

import { flowPresets, framePresets } from "./presets";

const localstorageKey = "flow-builder-localstorage";

type Flow = {
    title: string;
    frames: number[][];
};

export const useFlowBuilder = () => {
    const totalDots = 49;
    const isFirstRender = useRef(true);
    const isDragging = useRef(false);

    const [flows, setFlows] = useState<Flow[]>([{ title: "Untitled", frames: [[]] }]);
    const [currentFlow, setCurrentFlow] = useState("Untitled");
    const [frames, setFrames] = useState<number[][]>([[]]);
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        const active = flows.find((f) => f.title === currentFlow);
        setFrames(active?.frames ?? [[]]);
        setCurrentFrame(0);
    }, [currentFlow]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setFlows((prev) => prev.map((flow) => (flow.title === currentFlow ? { ...flow, frames } : flow)));
    }, [frames]);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(localstorageKey);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setFlows(parsed);
                    setCurrentFlow(parsed[0]?.title ?? "Untitled");
                }
            }
        } catch {
            // ignore error
        }
        const onPointerUp = () => (isDragging.current = false);
        window.addEventListener("pointerup", onPointerUp);
        return () => window.removeEventListener("pointerup", onPointerUp);
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(localstorageKey, JSON.stringify(flows));
        } catch {
            // ignore error
        }
    }, [flows]);

    const addNewFlow = () => {
        const baseTitle = "Untitled";
        let index = 1;
        let newTitle = `${baseTitle} ${index}`;

        const existingTitles = new Set(flows.map((flow) => flow.title));

        while (existingTitles.has(newTitle)) {
            index++;
            newTitle = `${baseTitle} ${index}`;
        }

        const newFlow = { title: newTitle, frames: [[]] };
        setFlows((prev) => [...prev, newFlow]);
        setCurrentFlow(newTitle);
    };

    const moveCurrentFlow = (dir: "up" | "down") => {
        const index = flows.findIndex((f) => f.title === currentFlow);
        if (index === -1) return;
        const nextIndex = (index + (dir === "up" ? -1 : 1) + flows.length) % flows.length;
        setCurrentFlow(flows[nextIndex].title);
    };

    const updateFlowTitle = (index: number, newTitle: string) => {
        setFlows((prev) => {
            const existing = prev[index];
            if (!existing || existing.title === newTitle) return prev;

            const updated = [...prev];
            updated[index] = { ...updated[index], title: newTitle };
            return updated;
        });

        setCurrentFlow((prev) => (prev === flows[index].title ? newTitle : prev));
    };

    const duplicateFlow = (index: number) => {
        const flow = flows[index];
        if (!flow) return;

        const baseTitle = `${flow.title} Copy`;
        const existingTitles = new Set(flows.map((f) => f.title));

        let copyIndex = 1;
        let newTitle = baseTitle;

        while (existingTitles.has(newTitle)) {
            copyIndex++;
            newTitle = `${baseTitle} ${copyIndex}`;
        }

        const newFlow = {
            title: newTitle,
            frames: flow.frames.map((f) => [...f]),
        };

        setFlows((prev) => {
            const updated = [...prev];
            updated.splice(index + 1, 0, newFlow);
            return updated;
        });

        setCurrentFlow(newTitle);
    };

    const deleteFlow = (index: number) => {
        if (flows.length <= 1) {
            setFlows([
                {
                    title: "Untitled",
                    frames: [[]],
                },
            ]);
            setCurrentFlow("Untitled");
            return;
        }

        setFlows((prev) => {
            if (prev.length <= 1) return prev;
            const updated = [...prev];
            const [removed] = updated.splice(index, 1);
            if (removed.title === currentFlow) {
                const fallback = updated[index] ?? updated[index - 1];
                setCurrentFlow(fallback.title);
            }
            return updated;
        });
    };

    const toggleDot = useCallback(
        (dot: number) => {
            setFrames((prev) => {
                const updated = [...prev];
                const frame = new Set(updated[currentFrame]);
                if (frame.has(dot)) frame.delete(dot);
                else frame.add(dot);
                updated[currentFrame] = Array.from(frame);
                return updated;
            });
        },
        [currentFrame],
    );

    const handlePointerDown = (i: number) => {
        isDragging.current = true;
        toggleDot(i);
    };

    const handlePointerEnter = (i: number) => {
        if (isDragging.current) toggleDot(i);
    };

    const handlePointerUp = () => {
        isDragging.current = false;
    };

    const addNewFrame = () => {
        setFrames((prev) => {
            const updated = [...prev, []];
            setCurrentFrame(updated.length - 1);
            return updated;
        });
    };

    const duplicateFrame = (index: number) => {
        const original = frames[index];
        if (!original) return;
        setFrames((prev) => {
            const updated = [...prev, [...original]];
            setCurrentFrame(updated.length - 1);
            return updated;
        });
    };

    const deleteFrame = (index: number) => {
        if (frames.length <= 1) return clearFrame();
        setFrames((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            setCurrentFrame((c) => (index < c ? c - 1 : index === c ? Math.max(0, c - 1) : c));
            return updated;
        });
    };

    const clearFrame = () => {
        setFrames((prev) => {
            const updated = [...prev];
            updated[currentFrame] = [];
            return updated;
        });
    };

    const moveCurrentFrame = (dir: "up" | "down") => {
        setCurrentFrame((c) =>
            dir === "up" ? (c > 0 ? c - 1 : frames.length - 1) : c < frames.length - 1 ? c + 1 : 0,
        );
    };

    const move = (dir: "up" | "down" | "left" | "right") => {
        const shift = {
            up: (i: number) => (i >= 7 ? i - 7 : null),
            down: (i: number) => (i < 42 ? i + 7 : null),
            left: (i: number) => (i % 7 !== 0 ? i - 1 : null),
            right: (i: number) => (i % 7 !== 6 ? i + 1 : null),
        }[dir];

        setFrames((prev) =>
            prev.map((f, i) => (i === currentFrame ? f.map(shift).filter((n): n is number => n !== null) : f)),
        );
    };

    const invertFrame = () => {
        setFrames((prev) => {
            const updated = [...prev];
            const set = new Set(updated[currentFrame]);
            updated[currentFrame] = Array.from({ length: totalDots }, (_, i) => (set.has(i) ? null : i)).filter(
                (i): i is number => i !== null,
            );
            return updated;
        });
    };

    const reorderFrames = ({ source, destination }: DropResult) => {
        if (!destination) return;
        setFrames((prev) => {
            const updated = [...prev];
            const [moved] = updated.splice(source.index, 1);
            updated.splice(destination.index, 0, moved);
            return updated;
        });
    };

    const reorderFlows = ({ source, destination }: DropResult) => {
        if (!destination) return;
        setFlows((prev) => {
            const updated = [...prev];
            const [moved] = updated.splice(source.index, 1);
            updated.splice(destination.index, 0, moved);
            return updated;
        });
    };

    const selectFramePreset = (preset: number) => {
        setFrames(framePresets[preset].frames);
    };

    const selectFlowPreset = (preset: number) => {
        setFlows(flowPresets[preset].items);
    };

    return {
        totalDots,
        flows,
        currentFlow,
        setCurrentFlow,
        updateFlowTitle,
        addNewFlow,
        moveCurrentFlow,
        duplicateFlow,
        deleteFlow,
        frames,
        currentFrame,
        setCurrentFrame,
        addNewFrame,
        duplicateFrame,
        deleteFrame,
        clearFrame,
        moveCurrentFrame,
        toggleDot,
        move,
        invertFrame,
        reorderFrames,
        reorderFlows,
        selectFramePreset,
        selectFlowPreset,
        handlePointerDown,
        handlePointerEnter,
        handlePointerUp,
    };
};

export type FlowBuilderHook = ReturnType<typeof useFlowBuilder>;
