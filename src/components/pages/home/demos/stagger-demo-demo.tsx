"use client";

import { useEffect, useState } from "react";

import { StaggerOnScroll } from "@/components/gsap/stagger-on-scroll";

const effects = ["scale", "slideInRight", "blur", "random"] as const;

export const StaggerDemo = () => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setKey((index) => (index < 3 ? index + 1 : 0));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <StaggerOnScroll
            className="grid w-full grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3"
            effect={effects[key % 4]}
            key={key}>
            {[
                "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c",
                "https://images.unsplash.com/photo-1620987278429-ab178d6eb547",
                "https://images.unsplash.com/photo-1626544827763-d516dce335e2",
                "https://images.unsplash.com/photo-1621109246687-10ae613f2d8e",
                "https://images.unsplash.com/photo-1714464703034-f74ec8163fc2",
                "https://images.unsplash.com/photo-1532456745301-b2c645d8b80d",
            ].map((image, i) => (
                <img src={image} className="h-20 w-full rounded object-cover sm:h-24 xl:h-32" alt="Image" key={i} />
            ))}
        </StaggerOnScroll>
    );
};
