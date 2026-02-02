import { GalleryHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const LayoutWidthManager = () => {
    const onChange = () => {
        document.documentElement.classList.toggle("layout-width-full");
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => onChange()}
            className="max-xl:hidden"
            aria-label="Toggle layout width">
            <GalleryHorizontalIcon className="size-4.5" suppressHydrationWarning />
        </Button>
    );
};
