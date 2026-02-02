"use client";

import { Fragment, ReactNode, useEffect, useState } from "react";

import { AnimatedStack } from "@/components/gsap/animated-stack";

const Task = ({ title, time }: { title: string; time: number }) => {
    const [passedTime, setPassedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPassedTime((t) => {
                if (t > time - 2) {
                    clearInterval(interval);
                }
                return t + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <div className="bg-card flex min-w-52 items-center justify-between gap-3 rounded border px-3 py-2">
            <p className="font-medium">{title}</p>
            <div className="text-muted-foreground flex items-center justify-end">{passedTime}s</div>
        </div>
    );
};

export function Demo() {
    const [list, setList] = useState<ReactNode[]>([<Task time={3} title={"Booting"} key={1} />]);

    useEffect(() => {
        const t1 = setTimeout(() => {
            setList((list) => [...list, <Task time={3} title={"Setting Up"} key={2} />]);
        }, 3500);
        const t2 = setTimeout(() => {
            setList((list) => [...list, <Task time={3} title={"Loading Data"} key={3} />]);
        }, 7000);
        const t3 = setTimeout(() => {
            setList((list) => [...list, <Task time={3} title={"Warming Up"} key={4} />]);
        }, 10500);
        const t4 = setTimeout(() => {
            setList((list) => [...list, <Task time={3} title={"Checking Systems"} key={5} />]);
        }, 14000);

        return () => {
            clearInterval(t1);
            clearInterval(t2);
            clearInterval(t3);
            clearInterval(t4);
        };
    }, []);

    return (
        <div className="mx-auto w-64 py-50">
            <AnimatedStack visibleCount={2} offset={10} gap={2}>
                {list.map((item, i) => (
                    <Fragment key={i}>{item}</Fragment>
                ))}
            </AnimatedStack>
        </div>
    );
}
