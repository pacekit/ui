import { SpringButton } from "@/components/gsap/spring-button";

export const Demo = ({ ...props }) => {
    return (
        <SpringButton
            className="bg-primary text-primary-foreground cursor-pointer rounded-md px-6 py-3 text-lg font-medium"
            scale={0.6}
            {...props}>
            Scale: 0.6
        </SpringButton>
    );
};
