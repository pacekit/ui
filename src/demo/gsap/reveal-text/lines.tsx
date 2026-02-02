import { RevealText } from "@/components/gsap/reveal-text";

export const Demo = () => {
    return (
        <RevealText type="lines">
            <p className="text-center text-lg font-medium sm:text-xl xl:text-2xl">Unleash creativity with every line</p>
            <p className="text-center text-sm sm:text-xl">Each line tells its own story, waiting to be revealed</p>
            <p className="text-center text-sm sm:text-lg">Transform simple text into a captivating experience</p>
        </RevealText>
    );
};
