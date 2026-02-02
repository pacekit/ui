import { DotLoader } from "@/components/gsap/dot-loader";

const game = [
    [14, 7, 0, 8, 6, 13, 20],
    [14, 7, 13, 20, 16, 27, 21],
    [14, 20, 27, 21, 34, 24, 28],
    [27, 21, 34, 28, 41, 32, 35],
    [34, 28, 41, 35, 48, 40, 42],
    [34, 28, 41, 35, 48, 42, 46],
    [34, 28, 41, 35, 48, 42, 38],
    [34, 28, 41, 35, 48, 30, 21],
    [34, 28, 41, 48, 21, 22, 14],
    [34, 28, 41, 21, 14, 16, 27],
    [34, 28, 21, 14, 10, 20, 27],
    [28, 21, 14, 4, 13, 20, 27],
    [28, 21, 14, 12, 6, 13, 20],
    [28, 21, 14, 6, 13, 20, 11],
    [28, 21, 14, 6, 13, 20, 10],
    [14, 6, 13, 20, 9, 7, 21],
];

export const Demo = () => {
    return (
        <div className="bg-card flex items-center gap-5 rounded p-6 shadow">
            <div className="">
                <DotLoader
                    frames={game}
                    className="rotate-90 gap-0.5"
                    duration={150}
                    dotClassName="bg-primary/10 [&.active]:bg-linear-to-r [&.active]:from-primary [&.active]:shadow-xl shadow-primary/20 [&.active]:to-primary/50 size-4 rounded-xs"></DotLoader>
            </div>
            <p className="font-medium">Playing</p>
        </div>
    );
};
