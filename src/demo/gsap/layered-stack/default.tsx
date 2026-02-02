import { LayeredStack } from "@/components/gsap/layered-stack";

export const Demo = () => {
    return (
        <div>
            <LayeredStack className="grid grid-cols-4 gap-4 p-8">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="text-muted-foreground bg-card flex size-32 items-center justify-center rounded-xl border text-xl font-medium">
                        {i + 1}
                    </div>
                ))}
            </LayeredStack>
        </div>
    );
};
