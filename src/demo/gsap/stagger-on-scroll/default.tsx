import { StaggerOnScroll } from "@/components/gsap/stagger-on-scroll";

export const Demo = ({ ...props }) => {
    return (
        <StaggerOnScroll className="my-24 grid w-full grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3" {...props}>
            {[
                "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c",
                "https://images.unsplash.com/photo-1620987278429-ab178d6eb547",
                "https://images.unsplash.com/photo-1626544827763-d516dce335e2",
                "https://images.unsplash.com/photo-1621109246687-10ae613f2d8e",
                "https://images.unsplash.com/photo-1714464703034-f74ec8163fc2",
                "https://images.unsplash.com/photo-1532456745301-b2c645d8b80d",
            ].map((image, i) => (
                <img src={image} className="h-30 w-full rounded object-cover sm:h-40 xl:h-50" alt="Image" key={i} />
            ))}
        </StaggerOnScroll>
    );
};
