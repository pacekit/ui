import { Spinner } from "@/components/ui/spinner";

import { FillableButton } from "@/components/gsap/fillable-button";

export const Demo = () => {
    return (
        <FillableButton disabled>
            <Spinner data-icon="inline-start" />
            Loading
        </FillableButton>
    );
};
