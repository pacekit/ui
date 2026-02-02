import { TiltCard } from "@/components/gsap/tilt-card";

export const Demo = () => {
    return (
        <TiltCard className="rounded bg-black p-16 sm:p-24 xl:p-36" highlightClassName="bg-white/15 dark:bg-white/2">
            <h2 className="text-white">Hover Me</h2>
        </TiltCard>
    );
};
