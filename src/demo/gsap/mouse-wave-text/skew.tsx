import { MouseWaveText } from "@/components/gsap/mouse-wave-text";

export const Demo = () => {
    return (
        <MouseWaveText
            className="text-3xl font-semibold"
            textClassName="text-purple-500"
            shadowClassName="text-purple-500/20"
            wrapperTweenVars={{
                rotate: -50,
                skewY: 22,
                scaleX: 0.75,
            }}>
            Mouse Wave Text
        </MouseWaveText>
    );
};
