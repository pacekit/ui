import { RevealText } from "@/components/gsap/reveal-text";

export const Demo = () => {
    return (
        <RevealText type="words">
            <p className="text-center text-lg font-medium sm:text-2xl xl:text-3xl">Animate your text with style</p>
            <p className="text-center text-sm">Smooth, expressive transitions for any part of your content</p>
        </RevealText>
    );
};
