"use client";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeftOnRectangleIcon,
    ArrowRightOnRectangleIcon,
    CalendarDaysIcon,
    RectangleStackIcon,
    TrophyIcon,
    TvIcon,
    UserIcon,
} from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import browserDatabaseClient from "@/util/browser-database-client";

export function DesktopNavLink({
    icon,
    href,
    label,
}: {
    icon: React.ReactNode;
    href: string;
    label: string;
}) {
    return (
        <Link href={href}>
            <motion.div
                variants={{
                    rest: {
                        gap: 0,
                    },
                    hover: {
                        gap: 16,
                    },
                }}
                className={`p-1 px-2 dark:text-slate-400 transition items-center duration-200 flex dark:hover:text-white dark:hover:bg-white/10 rounded-md`}
            >
                <motion.div
                    variants={{
                        rest: {
                            width: 24,
                            height: 24,
                        },
                        hover: {
                            width: 18,
                            height: 18,
                        },
                    }}
                >
                    {icon}
                </motion.div>
                <motion.span
                    variants={{
                        rest: {
                            opacity: 0,
                            x: -4,
                            marginLeft: 0,
                            width: 0,
                        },
                        hover: {
                            opacity: 1,
                            marginLeft: 12,
                            width: "auto",
                        },
                    }}
                    className="font-heading whitespace-nowrap font-medium text-lg"
                >
                    {label}
                </motion.span>
            </motion.div>
        </Link>
    );
}

export function MobileNavLink({
    icon,
    href,
    label,
}: {
    icon: React.ReactNode;
    href: string;
    label: string;
}) {
    return (
        <Link href={href} className="group px-2">
            <div
                className={`p-3 flex-col dark:text-slate-400 transition items-center duration-200 flex dark:hover:text-white dark:hover:bg-white/10 rounded-md`}
            >
                <div className="w-6 h-6 group-active:scale-95 transition duration-200">
                    {icon}
                </div>
                <span className="sr-only font-heading whitespace-nowrap font-medium text-xs">
                    {label}
                </span>
            </div>
        </Link>
    );
}

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(
        undefined
    );

    useEffect(() => {
        const supabase = browserDatabaseClient();
        supabase.auth.getUser().then((res) => {
            if (res.data.user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    const logout = useCallback(async () => {
        if (!isLoggedIn) {
            return;
        }
        const supabase = browserDatabaseClient();
        await supabase.auth.signOut();
        setIsLoggedIn(false);
    }, [isLoggedIn]);

    return (
        <header>
            <nav className="fixed z-30 dark:bg-slate-800 border lg:hidden dark:border-gray-700 p-2 bottom-0 left-0 right-0">
                <nav className="flex w-full px-1 justify-center items-center divide-x divide-gray-700">
                    <MobileNavLink
                        icon={<RectangleStackIcon className="w-full h-full" />}
                        label="Games"
                        href="/"
                    />
                    <MobileNavLink
                        icon={<TrophyIcon className="w-full h-full" />}
                        label="Leaderboard"
                        href="/leaderboard"
                    />
                    <MobileNavLink
                        icon={<TvIcon className="w-full h-full" />}
                        label="Watch"
                        href="/watch"
                    />
                    {isLoggedIn !== undefined && (
                        <>
                            {isLoggedIn === false ? (
                                <>
                                    <MobileNavLink
                                        icon={
                                            <UserIcon className="w-full h-full" />
                                        }
                                        label="Login"
                                        href="/auth/login"
                                    />
                                </>
                            ) : (
                                <>
                                    <MobileNavLink
                                        icon={
                                            <UserIcon className="w-full h-full" />
                                        }
                                        label="Profile"
                                        href="/profile"
                                    />
                                    <button
                                        onClick={logout}
                                        className="group px-2"
                                    >
                                        <div
                                            className={`p-1 px-2 flex-col dark:text-slate-400 transition items-center duration-200 flex dark:hover:text-white dark:hover:bg-white/10 rounded-md`}
                                        >
                                            <div className="w-6 h-6 group-active:scale-95 transition duration-200">
                                                <ArrowLeftOnRectangleIcon className="w-full h-full" />
                                            </div>
                                            <span className="font-heading whitespace-nowrap font-medium text-sm">
                                                Logout
                                            </span>
                                        </div>
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </nav>
            </nav>
            <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="bg-white hidden lg:block fixed top-0 overflow-hidden bottom-0 shadow-lg left-0 z-30 border-gray-200 h-full border-r dark:border-gray-700 p-4 px-2 dark:bg-slate-800"
            >
                <div className="flex flex-col h-full justify-between items-center mx-auto">
                    <div className="flex items-start flex-col">
                        <Link href="/">
                            <Image
                                src="/logo.svg"
                                className="h-6 sm:h-9"
                                width={48}
                                height={48}
                                alt="Krause Picks Logo"
                            />
                            <span className="sr-only">Krause Picks</span>
                        </Link>
                        <nav className="flex flex-col w-full px-1 gap-4 mt-12">
                            <DesktopNavLink
                                icon={
                                    <RectangleStackIcon className="w-full h-full" />
                                }
                                label="Games"
                                href="/"
                            />
                            <DesktopNavLink
                                icon={<TrophyIcon className="w-full h-full" />}
                                label="Leaderboard"
                                href="/leaderboard"
                            />
                            <DesktopNavLink
                                icon={<TvIcon className="w-full h-full" />}
                                label="Watch"
                                href="/watch"
                            />
                        </nav>
                    </div>
                    {isLoggedIn !== undefined && (
                        <>
                            {isLoggedIn === false ? (
                                <div className="flex items-stretch w-full font-heading lg:order-2 gap-1 flex-col">
                                    <DesktopNavLink
                                        icon={
                                            <ArrowRightOnRectangleIcon className="w-full h-full" />
                                        }
                                        label="Login"
                                        href="/auth/login"
                                    />
                                    <DesktopNavLink
                                        icon={
                                            <UserIcon className="w-full h-full" />
                                        }
                                        label="Signup"
                                        href="/auth/signup"
                                    />
                                </div>
                            ) : (
                                <button onClick={logout} className="w-full">
                                    <DesktopNavLink
                                        icon={
                                            <ArrowLeftOnRectangleIcon className="w-full h-full" />
                                        }
                                        label="Logout"
                                        href="#"
                                    />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </motion.div>
        </header>
    );
}
