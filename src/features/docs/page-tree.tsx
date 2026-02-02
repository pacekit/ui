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

// const transformPageTree = (tree: Folder): Folder => {
//     function transform<T extends Item | Separator>(item: T) {
//         if (typeof item.icon !== "string") return item;
//
//         return {
//             ...item,
//             icon: (
//                 <span
//                     dangerouslySetInnerHTML={{
//                         __html: item.icon,
//                     }}
//                 />
//             ),
//         };
//     }
//
//     return {
//         ...tree,
//         index: tree.index ? transform(tree.index) : undefined,
//         children: tree.children.map((item) => {
//             if (item.type === "folder") return transformPageTree(item);
//             return transform(item);
//         }),
//     };
// };

export const getPageTree = async (): Promise<Folder> => {
    if (!singletonTree) {
        const data = await loader();
        singletonTree = data.tree as Folder;
    }
    return singletonTree;
};
