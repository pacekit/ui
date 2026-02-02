import { RevealText } from "@/components/gsap/reveal-text";

export const Demo = () => {
    return (
        <RevealText type="lines" splitTextVars={{ mask: "lines" }}>
            <p className="text-center text-lg font-medium sm:text-xl xl:text-2xl">
                Watch creativity unfold, line by line
            </p>
            <p className="text-center text-sm sm:text-lg">Each line is hidden, waiting to be revealed</p>
            <p className="text-center text-sm sm:text-lg">Experience text coming to life with a masked animation</p>
        </RevealText>
    );
};
