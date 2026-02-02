import { DataRegistry } from "@/lib/registry/types";

export const blockRegistries: DataRegistry[] = [
    {
        name: "blocks-stats-simple-metric",
        title: "Simple Metric Stat",
        description: "A compact layout that highlights essential data for quick understanding.",
        type: "registry:block",
        demoPath: "demo/blocks/stats/simple-metric-stat/default.tsx",
        files: [
            {
                path: "components/blocks/stats/simple-metric-stat.tsx",
                type: "registry:block",
                target: "~/components/blocks/stats/simple-metric-stat.tsx",
            },
        ],
    },
    {
        name: "blocks-stats-rich-metric",
        title: "Rich Metric Stat",
        description: "A detailed layout that adds context and visual trends for deeper insights.",
        type: "registry:block",
        demoPath: "demo/blocks/stats/rich-metric-stat/default.tsx",
        files: [
            {
                path: "components/blocks/stats/rich-metric-stat.tsx",
                type: "registry:block",
                target: "~/components/blocks/stats/rich-metric-stat.tsx",
            },
        ],
    },
    {
        name: "blocks-charts-simple-metric",
        title: "Simple Metric Chart",
        description: "A straightforward chart for displaying key values at a glance.",
        type: "registry:block",
        demoPath: "demo/blocks/charts/simple-metric-chart/default.tsx",
        files: [
            {
                path: "components/blocks/charts/simple-metric-chart.tsx",
                type: "registry:block",
                target: "~/components/blocks/charts/simple-metric-chart.tsx",
            },
        ],
    },
    {
        name: "blocks-charts-interactive-visual",
        title: "Interactive Visual Chart",
        description: "An interactive chart that helps explore patterns and trends.",
        type: "registry:block",
        demoPath: "demo/blocks/charts/interactive-visual-chart/default.tsx",
        files: [
            {
                path: "components/blocks/charts/interactive-visual-chart.tsx",
                type: "registry:block",
                target: "~/components/blocks/charts/interactive-visual-chart.tsx",
            },
        ],
    },
    {
        name: "blocks-charts-interactive-insight",
        title: "Interactive Insight Chart",
        description: "A data-rich chart focused on deeper analysis and user interaction.",
        type: "registry:block",
        demoPath: "demo/blocks/charts/interactive-insight-chart/default.tsx",
        files: [
            {
                path: "components/blocks/charts/interactive-insight-chart.tsx",
                type: "registry:block",
                target: "~/components/blocks/charts/interactive-insight-chart.tsx",
            },
        ],
    },
];
