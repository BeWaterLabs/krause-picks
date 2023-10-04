import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

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
                className={`${inter.className} h-screen flex flex-col dark:bg-slate-900 dark:text-gray-200`}
            >
                <Toaster />
                <Header />
                <main className="px-8 py-4 w-screen overflow-x-hidden flex-1">
                    {children}
                </main>
            </body>
        </html>
    );
}
