import { GithubStarCounter } from "@/components/gsap/github-star-counter";

export const Demo = () => {
    return (
        <div>
            <GithubStarCounter repo="shadcn/ui" />
            <p className="text-muted-foreground mt-1 text-center text-sm italic">shadcn/ui</p>
        </div>
    );
};
