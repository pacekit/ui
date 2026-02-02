"use client";

import { FlowList } from "./components/FlowList";
import { FrameList } from "./components/FrameList";
import { Playground } from "./components/Playground";
import { Preview } from "./components/Preview";
import { useFlowBuilder } from "./use-flow-builder";

export const FlowBuilder = () => {
    const hook = useFlowBuilder();

    return (
        <div className="not-prose mb-16">
            <Preview hook={hook} />
            <div className="mt-8 grid grid-cols-1 flex-wrap items-stretch gap-y-8 py-6 xl:grid-cols-3 xl:py-8 2xl:py-8">
                <div className="border-dashed pe-4 xl:border-e">
                    <FlowList hook={hook} />
                </div>
                <div className="px-2 2xl:px-4">
                    <Playground hook={hook} />
                </div>

                <div className="px-2 2xl:ps-4">
                    <FrameList hook={hook} />
                </div>
            </div>
        </div>
    );
};
