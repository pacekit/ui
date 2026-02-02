export const TOCAds = () => {
    return (
        <a
            href="https://pacekit.dev/better-auth-starter"
            target="_blank"
            className="group relative block rounded-md border">
            <div className="bg-muted/40 p-1.5 px-2.5">
                <p className="font-medium">Better Auth Starter</p>
                <p className="text-muted-foreground mt-0.5 text-sm leading-tight">
                    Ship your SaaS faster with a solid starting point for TanStack Start and Next.js
                </p>
            </div>
            <div className="text-primary group-hover:bg-background/70 absolute inset-0 flex items-center justify-center rounded-md opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                <p className="text-lg font-semibold">Launch Now</p>
            </div>
        </a>
    );
};
