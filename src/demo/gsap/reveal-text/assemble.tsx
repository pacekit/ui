import { RevealText } from "@/components/gsap/reveal-text";

export const Demo = () => {
    return (
        <RevealText
            gsapVars={{
                duration: 1,
                yPercent: "random([-150, 150])",
                xPercent: "random([-150, 150])",
                stagger: {
                    from: "random",
                    amount: 0.6,
                },
                ease: "power3.out",
            }}>
            <p className="text-center text-lg font-medium sm:text-2xl xl:text-3xl">Animate your text with style</p>
            <p className="text-center text-sm">Smooth, expressive transitions for any part of your content</p>
        </RevealText>
    );
};
