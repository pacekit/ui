import { LayersIcon, LucideIcon, PackageIcon, ZapIcon } from "lucide-react";

type Feature = {
    title: string;
    description: string;
    icon: LucideIcon;
};

const features: Feature[] = [
    {
        title: "Built-in Animation",
        description: "Smooth natural transitions by default, powered by GSAP for reliable and fluid performance.",
        icon: ZapIcon,
    },
    {
        title: "Instant Setup",
        description:
            "Start fast with shadcn CLI and Tailwind CSS. No config needed, just run the command and build instantly.",
        icon: PackageIcon,
    },
    {
        title: "Adaptive Design",
        description:
            "Fits any layout or theme. Customize quickly or use as-is across projects, sections, screen sizes.",
        icon: LayersIcon,
    },
];

export const Feature = () => {
    return (
        <div className="mt-6 gap-16 overflow-hidden sm:mt-12 lg:mt-16 xl:mt-24 2xl:mt-32">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
                {features.map(({ icon: Icon, description, title }, index) => (
                    <div key={index} className="flex flex-col items-center rounded p-5">
                        <div className="bg-muted inline-flex rounded p-2.5">{<Icon className="size-5.5" />}</div>
                        <p className="mt-2 text-lg font-medium">{title}</p>
                        <p className="text-foreground/80 mt-1 max-w-sm text-center text-sm">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
