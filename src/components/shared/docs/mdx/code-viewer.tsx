"use client";

import { useMemo, useState } from "react";

import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

import { loadSource } from "@/lib/file-loader";
import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";

type File = {
    code?: string;
    path: string;
    lang?: string;
};

type Props = {
    files: File[];
    className?: string;
};

const refineCode = (code: string) => {
    return code.replace(/^\n|\n\s*$/g, "");
};

export const CodeViewer = ({ files = [], className }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [codes, setCodes] = useState<Record<string, string | null>>({});

    const loadCode = (file: File) => {
        if (!codes[file.path]) {
            loadSource(file.path).then((text) => {
                setCodes({ ...codes, [file.path]: text });
            });
        }
    };

    const selectedFile = useMemo((): File | undefined => {
        return files[selectedIndex];
    }, [selectedIndex]);

    const selectedLang = useMemo(() => {
        return selectedFile?.lang ?? selectedFile?.path.split(".").at(-1) ?? "tsx";
    }, [selectedFile]);

    const selectedCode = useMemo(() => {
        if (!selectedFile) return "";
        const code = selectedFile.code ?? codes[selectedFile.path];
        if (!code) loadCode(selectedFile);
        return refineCode(code ?? "");
    }, [selectedFile, codes]);

    return (
        <div className="bg-muted rounded-md" data-slot="code-viewer">
            <div className="flex items-center justify-between pe-2">
                <div className="flex items-center px-2 pt-2">
                    {files?.map((file, index) => (
                        <div
                            className={cn(
                                "hover:text-foreground text-muted-foreground cursor-pointer px-3 py-1.5 text-sm transition-all",
                                {
                                    "bg-background text-foreground rounded-t-sm font-medium shadow-sm":
                                        selectedIndex === index,
                                },
                            )}
                            key={index}
                            onClick={() => setSelectedIndex(index)}>
                            {`${file.path.split("/").at(-1)}`}
                        </div>
                    ))}
                </div>
                <CopyButton text={selectedCode} />
            </div>
            <div className={cn("relative mt-0 max-h-96 px-2 pb-2", className)}>
                <DynamicCodeBlock
                    lang={selectedLang}
                    code={selectedCode}
                    codeblock={{
                        className: cn("max-h-80 bg-background rounded-sm border-none", {
                            "rounded-tl-none": selectedIndex === 0,
                        }),
                        viewportProps: {
                            className: "max-h-80 custom-scrollbar",
                        },
                        allowCopy: false,
                    }}
                    options={{
                        themes: {
                            light: "github-light",
                            dark: "github-dark",
                        },
                        transformers: [
                            transformerNotationHighlight({ matchAlgorithm: "v3" }),
                            transformerNotationDiff({ matchAlgorithm: "v3" }),
                        ],
                    }}
                />
            </div>
        </div>
    );
};
