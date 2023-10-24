import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Play } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header";

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${inter.variable} ${play.variable} font-body h-screen flex flex-col dark:bg-slate-900 dark:text-gray-200`}
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
                <Header />
                <main className="px-4 lg:px-8 pt-4 w-screen overflow-x-hidden flex-1">
                    {children}
                </main>
                <Analytics />
            </body>
        </html>
    );
}
