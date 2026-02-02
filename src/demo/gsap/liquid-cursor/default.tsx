import { LiquidCursor } from "@/components/gsap/liquid-cursor";

export const Demo = () => {
    return (
        <div className="cursor-none">
            <img
                src="https://images.unsplash.com/photo-1642510676258-397a4d69473a?w=1000"
                alt="Image"
                className="max-w-160 rounded"
            />
            <LiquidCursor size={44} />
        </div>
    );
};
