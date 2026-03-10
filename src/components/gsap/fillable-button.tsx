"use client";

import { cva, type VariantProps } from "class-variance-authority";
import gsap from "gsap";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        hover:
          "relative bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 dark:hover:text-white overflow-hidden rounded-full! px-6 py-3.5 tracking-tight after:absolute after:inset-0 after:rounded-full after:pointer-events-none after:content-['']",
        hoverOutline:
          "relative overflow-hidden rounded-full! bg-transparent text-foreground px-6 py-3.5 tracking-tight hover:text-background after:absolute after:inset-0 after:rounded-full after:border-2 after:border-zinc-500 after:pointer-events-none after:content-[''] dark:after:border-zinc-400",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "hover",
      size: "default",
    },
  },
);

function FillableButton({
  className,
  variant = "hover",
  size = "default",
  children,
  overlayClassname,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    overlayClassname?: string;
  }) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const flairRef = React.useRef<HTMLSpanElement>(null);

  const isHoverVariant = variant === "hover" || variant === "hoverOutline";

  React.useEffect(() => {
    if (!isHoverVariant) return;

    const button = buttonRef.current;
    const flair = flairRef.current;
    if (!button || !flair) return;

    const xSet = gsap.quickSetter(flair, "xPercent");
    const ySet = gsap.quickSetter(flair, "yPercent");

    function getXY(e: MouseEvent) {
      if (!button) return;
      const { left, top, width, height } = button.getBoundingClientRect();

      const xTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, width, 0, 100),
        gsap.utils.clamp(0, 100),
      );

      const yTransformer = gsap.utils.pipe(
        gsap.utils.mapRange(0, height, 0, 100),
        gsap.utils.clamp(0, 100),
      );

      return {
        x: xTransformer(e.clientX - left),
        y: yTransformer(e.clientY - top),
      };
    }

    function onMouseEnter(e: MouseEvent) {
      const pos = getXY(e);
      if (!pos) return;
      const { x, y } = pos;
      xSet(x);
      ySet(y);

      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    function onMouseLeave(e: MouseEvent) {
      const pos = getXY(e);
      if (!pos) return;
      const { x, y } = pos;

      gsap.killTweensOf(flair);

      gsap.to(flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    function onMouseMove(e: MouseEvent) {
      const pos = getXY(e);
      if (!pos) return;
      const { x, y } = pos;

      gsap.to(flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.4,
        ease: "power2",
      });
    }

    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);
    button.addEventListener("mousemove", onMouseMove);

    return () => {
      button.removeEventListener("mouseenter", onMouseEnter);
      button.removeEventListener("mouseleave", onMouseLeave);
      button.removeEventListener("mousemove", onMouseMove);
      gsap.killTweensOf(flair);
    };
  }, [isHoverVariant, variant]);

  if (isHoverVariant) {
    return (
      <button
        ref={buttonRef}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        <span
          ref={flairRef}
          className={cn(
            "pointer-events-none absolute inset-0 origin-top-left scale-0 will-change-transform",
            "before:pointer-events-none before:absolute before:left-0 before:top-0 before:block before:aspect-square before:w-[170%]",
            "before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-zinc-600 before:content-['']",
            variant === "hover" && "before:bg-primary",
            variant === "hoverOutline" &&
              "before:bg-zinc-500 dark:before:bg-zinc-400",
            overlayClassname,
          )}
        />
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

export { FillableButton, buttonVariants };
