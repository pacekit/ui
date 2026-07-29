import { cn } from "@/lib/utils";

const LogoIcon = ({ className }: { className?: string }) => (
    <svg aria-label="PaceUI" viewBox="0 0 512 512" fill="none" className={className}>
        <g clipPath="url(#clip0_560_192)">
            <path
                d="M256 0C51.2 0 0 51.2 0 256C0 460.8 51.2 512 256 512C460.8 512 512 460.8 512 256C512 51.2 460.8 0 256 0Z"
                className="fill-primary"
            />
            <g filter="url(#filter0_d_560_192)">
                <path
                    d="M376.676 98.032L158.375 225.882C156.657 226.905 155.048 228.364 153.706 230.119C152.363 231.873 151.333 233.863 150.715 235.895C150.099 237.869 149.946 239.815 150.273 241.507C150.594 243.113 151.401 244.373 152.58 245.114L250.15 278.695L132.905 408.642C132.317 409.432 131.891 410.334 131.68 411.236C131.47 412.095 131.504 412.911 131.774 413.556C132.032 414.226 132.482 414.627 133.123 414.759C133.757 414.894 134.489 414.752 135.208 414.355L353.521 286.487C355.239 285.465 356.848 284.005 358.19 282.251C359.532 280.496 360.563 278.506 361.181 276.475C361.79 274.506 361.94 272.566 361.612 270.88C361.296 269.269 360.493 268.002 359.315 267.255L272.46 222.302L378.991 103.728C379.579 102.937 380.004 102.036 380.216 101.134C380.425 100.275 380.392 99.458 380.121 98.8131C379.854 98.1965 379.381 97.7749 378.773 97.6109C378.139 97.4754 377.395 97.6348 376.676 98.032Z"
                    className="fill-primary"
                />
                <path
                    d="M376.676 98.032L158.375 225.882C156.657 226.905 155.048 228.364 153.706 230.119C152.363 231.873 151.333 233.863 150.715 235.895C150.099 237.869 149.946 239.815 150.273 241.507C150.594 243.113 151.401 244.373 152.58 245.114L250.15 278.695L132.905 408.642C132.317 409.432 131.891 410.334 131.68 411.236C131.47 412.095 131.504 412.911 131.774 413.556C132.032 414.226 132.482 414.627 133.123 414.759C133.757 414.894 134.489 414.752 135.208 414.355L353.521 286.487C355.239 285.465 356.848 284.005 358.19 282.251C359.532 280.496 360.563 278.506 361.181 276.475C361.79 274.506 361.94 272.566 361.612 270.88C361.296 269.269 360.493 268.002 359.315 267.255L272.46 222.302L378.991 103.728C379.579 102.937 380.004 102.036 380.216 101.134C380.425 100.275 380.392 99.458 380.121 98.8131C379.854 98.1965 379.381 97.7749 378.773 97.6109C378.139 97.4754 377.395 97.6348 376.676 98.032Z"
                    className="stroke-primary-foreground"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </g>
        <defs>
            <filter
                id="filter0_d_560_192"
                x="81.5443"
                y="52.5605"
                width="348.807"
                height="417.25"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dy="5" />
                <feGaussianBlur stdDeviation="20" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_560_192" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_560_192" result="shape" />
            </filter>
            <clipPath id="clip0_560_192">
                <rect width="512" height="512" className="fill-primary-foreground" />
            </clipPath>
        </defs>
    </svg>
);

const sizes = {
    default: {
        base: "gap-2",
        icon: "h-8",
        text: "text-2xl font-bold",
    },
    sm: {
        base: "gap-1.5",
        icon: "h-7",
        text: "text-xl font-semibold",
    },
};

export const Logo = ({
    responsive = true,
    className,
    size = "default",
}: {
    responsive?: boolean;
    className?: string;
    size?: keyof typeof sizes;
}) => {
    const sVariant = sizes[size];
    return (
        <div className={cn("flex items-center", sVariant.base, className)}>
            <LogoIcon className={sVariant.icon} />
            <p className={cn(sVariant.text, { "max-md:hidden": responsive })}>PaceUI</p>
        </div>
    );
};
