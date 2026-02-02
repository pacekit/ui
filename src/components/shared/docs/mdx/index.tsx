import * as StepsComponents from "fumadocs-ui/components/steps";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { MDXComponents } from "mdx/types";

import { CodeViewer } from "./code-viewer";
import { DemoPreview } from "./demo-preview";
import { InstallationViewer } from "./installation-viewer";

export function getMDXComponents(): MDXComponents {
    return {
        ...defaultMdxComponents,
        ...StepsComponents,
        ...TabsComponents,
        pre: ({ ...props }) => {
            return (
                <CodeBlock {...props}>
                    <Pre>{props.children}</Pre>
                </CodeBlock>
            );
        },
        h2: (props) => (
            <h3
                {...props}
                className="mt-10 scroll-m-28 text-2xl font-medium tracking-tight first:mt-0 lg:mt-16 [&+h3]:mt-6! [&+p]:mt-4!"
            />
        ),
        h3: (props) => <h3 {...props} className="mt-12 scroll-m-28 text-xl font-medium tracking-tight [&+p]:mt-4!" />,
        DemoPreview,
        InstallationViewer,
        CodeViewer,
    };
}
