import { SpringButton } from "@/components/gsap/spring-button";

export const Demo = ({ ...props }) => {
    return (
        <SpringButton
            className="bg-primary text-primary-foreground cursor-pointer rounded-md px-6 py-3 text-lg font-medium"
            {...props}>
            Click Me
        </SpringButton>
    );
};
