import { LiquidGlass } from "@/components/gsap/liquid-glass";

export const Demo = () => {
    return (
        <div className="relative cursor-none overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1000"
                alt="Background"
                className="aspect-square max-w-144 rounded-md object-cover"
            />
            <LiquidGlass borderRadius={60} blur={1} />
        </div>
    );
};
