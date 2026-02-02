import type { RegistryItem } from "shadcn/schema";

export type ShadcnRegistryItem = RegistryItem & {
    title: string;
    description: string;
};

export type DataRegistry = ShadcnRegistryItem & {
    demoPath: string;
};

export type GeneratedRegistry = {
    name: string;
    title: string;
    description: string;
    paths: string[];
};
