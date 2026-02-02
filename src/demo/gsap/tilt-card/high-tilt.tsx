import { TiltCard } from "@/components/gsap/tilt-card";
import { Button } from "@/components/ui/button";

export const Demo = () => {
    return (
        <TiltCard
            className="bg-card w-64 rounded border p-4 sm:w-80"
            highlightClassName="bg-white/15 dark:bg-white/2"
            maxTilt={25}>
            <p className="text-muted-foreground font-mono text-xs">09, May 2025</p>
            <p className="mt-1 text-lg/none font-medium">New York, USA</p>
            <img
                className="mt-3 h-40 w-full rounded object-cover"
                src="https://raw.githubusercontent.com/ServiceStack/images/refs/heads/master/hero/black-white-city.jpg"
                alt="Image"
            />
            <p className="text-muted-foreground mt-3 text-xs italic">Updated 2 days ago</p>
            <p className="mt-1 text-sm leading-tight">
                New York, often called New York City or NYC, is the most populous city in the United States.
            </p>
            <div className="mt-2 flex justify-end">
                <Button variant="default" size="sm" className="cursor-pointer">
                    Book a Ticket
                </Button>
            </div>
        </TiltCard>
    );
};
