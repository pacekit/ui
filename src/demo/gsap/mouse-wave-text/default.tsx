import { MouseWaveText } from "@/components/gsap/mouse-wave-text";

export const Demo = () => {
    return (
        <MouseWaveText
            className="text-3xl font-semibold"
            textClassName="text-blue-500"
            shadowClassName="text-blue-500/20">
            Mouse Wave Text
        </MouseWaveText>
    );
};
