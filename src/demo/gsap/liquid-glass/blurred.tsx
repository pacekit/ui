import { LiquidGlass } from "@/components/gsap/liquid-glass";

export const Demo = () => {
    return (
        <div className="relative cursor-none overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1642510676258-397a4d69473a?w=1000"
                alt="Background"
                className="size-144 rounded object-cover"
            />
            <LiquidGlass tintOpacity={0.15} blur={8} />
        </div>
    );
};
