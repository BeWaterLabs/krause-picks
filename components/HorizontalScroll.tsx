"use client";

import { motion } from "framer-motion";
import React from "react";

export default function HorizontalScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    const [offset, setOffset] = React.useState(0);
    const SHIFT_AMOUNT = 200;
    return (
        <div className="relative w-full h-32 overflow-hidden">
            <div
                onClick={() => setOffset(offset - SHIFT_AMOUNT)}
                className="w-16 cursor-pointer bg-gradient-to-r from-slate-900 to-transparent absolute left-0 z-10 top-0 bottom-0"
            ></div>
            <div className="absolute top-0 bottom-0 my-auto left-0 px-8 right-0 overflow-y-scroll scrollbar-none">
                <motion.div animate={{ translateX: offset }} className="flex">
                    {children}
                </motion.div>
            </div>
            <div
                onClick={() => setOffset(offset + SHIFT_AMOUNT)}
                className="w-16 cursor-pointer bg-gradient-to-r to-slate-900 from-transparent absolute right-0 z-10 top-0 bottom-0"
            />
        </div>
    );
}
