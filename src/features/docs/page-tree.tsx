import { createServerFn } from "@tanstack/react-start";

import type { Folder } from "fumadocs-core/page-tree";

import { source } from "./source";

let singletonTree: Folder | null = null;

const loader = createServerFn({
    method: "GET",
}).handler(() => {
    return {
        tree: source.pageTree as object,
    };
});

export const getPageTree = async (): Promise<Folder> => {
    if (!singletonTree) {
        const data = await loader();
        singletonTree = data.tree as Folder;
    }
    return singletonTree;
};
