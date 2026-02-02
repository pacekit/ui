import { MapPinIcon } from "lucide-react";

import { ProfilePeek } from "@/components/gsap/profile-peek";

export const Demo = () => {
    return (
        <div className="mb-24 flex -translate-x-1/2 items-center">
            <ProfilePeek
                trigger={
                    <img
                        src="https://unavatar.io/x/shadcn"
                        alt="Avatar"
                        className="size-12 cursor-pointer rounded-full object-cover"
                    />
                }
                content={
                    <div className="bg-card w-80 rounded-md p-4 shadow-sm">
                        <div className="ms-16">
                            <h3 className="mt-1 text-xl/none font-medium">shadcn</h3>
                            <p className="text-foreground/60 mt-1 text-sm/none">Doing something great at Vercel</p>
                        </div>
                        <p className="text-foreground/80 mt-4 text-[15px] leading-tight"></p>
                        <div className="-mx-4 mt-3 border-t"></div>
                        <div className=""></div>
                        <div className="text-foreground/80 mt-3 flex items-center justify-between gap-2 text-sm tracking-tight">
                            <div className="flex items-center gap-1.5">
                                <MapPinIcon className="size-3.5" />
                                <span>Dev's heart</span>
                            </div>
                            <p>shadcn/ui</p>
                        </div>
                    </div>
                }
            />
        </div>
    );
};
