const loaderRegistry = {
    components: {
        module: import.meta.glob("/src/components/**/*.tsx"),
        source: import.meta.glob("/src/components/**/*.tsx", {
            query: "?raw",
            import: "default",
        }),
    },
    demos: {
        module: import.meta.glob("/src/demo/**/*.tsx"),
        source: import.meta.glob("/src/demo/**/*.tsx", {
            query: "?raw",
            import: "default",
        }),
    },
    hooks: {
        source: import.meta.glob("/src/hooks/**/*.ts", {
            query: "?raw",
            import: "default",
        }),
    },
};

const resolveFilePath = (path: string) => {
    return `/src/${path}`;
};

const resolveLoader = (filePath: string, type: "module" | "source") => {
    const path = resolveFilePath(filePath);
    if (filePath.startsWith("demo/")) {
        return loaderRegistry.demos[type][path];
    }
    if (filePath.startsWith("hooks/")) {
        return loaderRegistry.hooks["source"][path];
    }

    return loaderRegistry.components[type][path];
};

export const loadComponent = async (filePath: string) => {
    const loader = resolveLoader(filePath, "module");
    if (!loader) return null;

    const module = (await loader()) as any;

    const exportedKey =
        Object.keys(module).find((key) => /^[A-Z]/.test(key) && typeof module[key] === "function") ?? "Demo";

    return module[exportedKey];
};

export const loadSource = async (filePath: string) => {
    const loader = resolveLoader(filePath, "source");
    if (!loader) return null;

    const source = (await loader()) as string;

    return source.endsWith("\n") ? source.slice(0, -1) : source;
};
