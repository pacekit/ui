import { DataRegistry } from "../types";
import { blockRegistries } from "./blocks";
import { gsapRegistries } from "./gsap";

export const publicRegistries: DataRegistry[] = [...blockRegistries, ...gsapRegistries];
