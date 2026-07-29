export const TOCAds = () => {
    return (
        <a href="https://paceui.com/" target="_blank" className="group relative block rounded-md border">
            <div className="bg-muted/40 px-3 py-2">
                <p className="font-medium">PaceUI</p>
                <p className="text-muted-foreground mt-1 text-sm leading-tight">
                    Shadcn Components, Blocks, Templates, Starters & much more
                </p>
            </div>
            <div className="text-primary group-hover:bg-background/70 absolute inset-0 flex items-center justify-center rounded-md opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                <p className="text-lg font-semibold">Explore Now</p>
            </div>
        </a>
    );
};
