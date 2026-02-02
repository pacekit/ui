import { useMemo, useState } from "react";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";

const managerCommands = {
    npm: "npx",
    yarn: "yarn dlx",
    pnpm: "pnpm dlx",
    bun: "bun x",
} as const;

type Manager = keyof typeof managerCommands;

const allManagers = Object.keys(managerCommands) as Manager[];

export const InstallationViewer = ({ command }: { command: string }) => {
    const [selectedManager, setSelectedManager] = useState<Manager>("npm");
    const commandText = useMemo(() => {
        return command.replace("npx", managerCommands[selectedManager]);
    }, [selectedManager]);

    return (
        <div className="bg-muted rounded-md">
            <div className="flex items-center justify-between pe-2">
                <div className="flex items-center px-2 pt-2">
                    {allManagers.map((manager, index) => (
                        <div
                            className={cn(
                                "hover:text-foreground text-muted-foreground cursor-pointer px-3 py-1.5 text-sm transition-all",
                                {
                                    "bg-background text-foreground rounded-t-sm font-medium shadow-sm":
                                        selectedManager === manager,
                                },
                            )}
                            key={index}
                            onClick={() => setSelectedManager(manager)}>
                            {manager}
                        </div>
                    ))}
                </div>
                <CopyButton text={commandText} />
            </div>
            <div className={cn("relative mt-0 max-h-96 px-2 pb-2")}>
                <DynamicCodeBlock
                    lang="shell"
                    code={commandText}
                    codeblock={{
                        className: cn("bg-background rounded-sm border-none", {
                            "rounded-tl-none": selectedManager === allManagers[0],
                        }),
                        allowCopy: false,
                    }}
                    options={{
                        themes: {
                            light: "github-light",
                            dark: "github-dark",
                        },
                    }}
                />
            </div>
        </div>
    );
};
