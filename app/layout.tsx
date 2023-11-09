import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Play } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });
const play = Play({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--play",
});

export const metadata: Metadata = {
    title: "Krause Picks",
    description: "",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${inter.variable} ${play.variable} font-body h-screen max-h-screen max-w-screen overflow-hidden flex flex-col dark:bg-slate-900 dark:text-gray-200`}
            >
                <Toaster
                    toastOptions={{
                        style: {
                            background: "rgb(15, 23, 42)",
                            color: "white",
                            border: "1px solid #333",
                        },
                    }}
                />
                <div className="w-full lg:pl-16 from-blue-900 bg-gradient-to-br to-blue-700 p-1 text-xs sm:text-sm md:text-base text-center text-white font-heading">
                    Unlimited free picks! • $20 daily prize to #1 performer
                </div>
                <div className="w-full pb-32 lg:pb-0 lg:pl-16 flex h-full">
                    <Navbar />
                    <main className="px-4 mx-auto max-w-lg lg:max-w-7xl lg:px-8 pt-4 w-screen flex-1">
                        {children}
                    </main>
                </div>
                <Analytics />
            </body>
        </html>
    );
}
