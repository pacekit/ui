import { GradientShadow } from "@/components/gsap/gradient-shadow";

export const Demo = () => {
    return (
        <GradientShadow colors={["#3b82f6", "#8b5cf6", "#ec4899"]}>
            <button className="rounded bg-black px-6 py-3 text-white">Hover me</button>
        </GradientShadow>
    );
};
