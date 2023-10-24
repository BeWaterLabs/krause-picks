"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useRef } from "react";

export default function HorizontalScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const scrollContainer = useRef<any>(null);
    const SHIFT_AMOUNT = 200;

    const scrollLeft = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({
                left: -SHIFT_AMOUNT,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainer.current) {
            scrollContainer.current.scrollBy({
                left: SHIFT_AMOUNT,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative w-full h-32 overflow-hidden">
            <div
                onClick={scrollLeft}
                className="hidden w-16 cursor-pointer lg:flex items-center justify-start bg-gradient-to-r from-slate-900 to-transparent absolute left-0 z-10 top-0 bottom-0"
            >
                <ChevronLeftIcon className="w-8 h-8 text-white" />
            </div>
            <div
                className="absolute top-0 bottom-0 scroll-smooth overflow-x-scroll my-auto left-0 px-0 lg:px-8 right-0 scrollbar-none"
                ref={scrollContainer}
            >
                <div className="flex">{children}</div>
            </div>
            <div
                onClick={scrollRight}
                className="hidden w-16 cursor-pointer justify-end bg-gradient-to-r to-slate-900 lg:flex items-center from-transparent absolute right-0 z-10 top-0 bottom-0"
            >
                <ChevronRightIcon className={`w-8 h-8 text-white`} />
            </div>
        </div>
    );
}
