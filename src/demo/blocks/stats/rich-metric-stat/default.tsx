import { RichMetricStat } from "@/components/blocks/stats/rich-metric-stat";

export const Demo = () => {
    return (
        <div className="w-sm">
            <RichMetricStat
                value="$45,231.89"
                title="Total Revenue"
                trendValue={20.1}
                footerLabel="+$8,432.12 from last month"
                footerSubtext="Based on 1,240 orders"
            />
        </div>
    );
};
