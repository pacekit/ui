import { SimpleMetricStat } from "@/components/blocks/stats/simple-metric-stat";

export const Demo = () => {
    return (
        <div className="w-sm">
            <SimpleMetricStat title="Lead CR" value="60%" changeValue="10.5%" direction="up" />
        </div>
    );
};
