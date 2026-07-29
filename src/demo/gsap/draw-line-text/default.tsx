import { DrawLineText } from "@/components/gsap/draw-line-text";

export const Demo = () => {
    return (
        <DrawLineText
            className="font-medium"
            fontSize={60}
            strokeWidth={1.5}
            text="PaceUI"
            color="var(--color-foreground)"
        />
    );
};
