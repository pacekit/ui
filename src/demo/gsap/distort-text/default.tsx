import { DistortText } from "@/components/gsap/distort-text";

export const Demo = () => {
    return (
        <DistortText className="font-mono sm:text-xl xl:text-2xl">
            <p>
                Step into a world where text bends to your will. With each hover, the words twist and unravel, only to
                seamlessly return to their original form, creating an ever-evolving dance of letters and meaning.
            </p>
            <div className="mt-3" />
            <p>
                Every movement invites you to disrupt the order. The letters respond to your touch, breaking apart and
                reforming in real-time, a unique visual experience born from your interaction with the text.
            </p>
            <div className="mt-3" />
            <p>
                What was once static now pulses with life, shifting and reshaping as you explore. Each hover is a moment
                of transformation, turning text into a living, breathing entity that adapts to your curiosity.
            </p>
        </DistortText>
    );
};
