import { Suspense, lazy, useMemo } from "react";

import { loadComponent } from "@/lib/file-loader";

export const ComponentViewer = ({ path }: { path: string }) => {
    const DynamicComponent = useMemo(() => {
        return lazy(async () => {
            const component = await loadComponent(path);
            if (!component) {
                return { default: () => <div>Component not found</div> };
            }
            return { default: component };
        });
    }, [path]);

    return (
        <Suspense fallback={<div className="h-40 w-80" />}>
            {typeof window !== "undefined" ? <DynamicComponent /> : null}
        </Suspense>
    );
};
