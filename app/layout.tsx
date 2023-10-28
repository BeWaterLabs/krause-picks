import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter, Play } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";
import { serverDatabaseClient } from "@/database";
import UserPanel from "@/components/UserPanel";

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
    const supabase = serverDatabaseClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

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
                <div className="w-full pl-16 from-blue-900 bg-gradient-to-br to-blue-700 p-1 text-sm md:text-base text-center text-white font-heading">
                    Unlimited free picks • $20 daily prize to #1 performer
                </div>
                <div className="w-full pl-16 flex h-full">
                    <Navbar />
                    <main className="px-4 lg:px-8 pt-4 w-screen overflow-x-hidden flex-1">
                        <div className="flex flex-col h-full gap-4 max-w-7xl mx-auto">
                            <div className={`flex items-stretch flex-1 gap-4`}>
                                <div className="flex-[2] relative">
                                    <div className="grid absolute pb-4 left-0 scrollbar-none right-0 top-0 bottom-0 overflow-y-scroll gap-4 overflow-scroll">
                                        {children}
                                    </div>
                                </div>
                                {user && (
                                    <div className="flex-1 pb-4 hidden lg:block">
                                        <UserPanel user={user} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
                <Analytics />
            </body>
        </html>
    );
}
