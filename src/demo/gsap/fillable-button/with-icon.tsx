import { GitBranchIcon } from "lucide-react";

import { FillableButton } from "@/components/gsap/fillable-button";

export const Demo = () => {
    return (
        <FillableButton variant="outline">
            <GitBranchIcon data-icon="inline-start" />
            New Branch
        </FillableButton>
    );
};
