import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./auth/LogoutButton";
import serverDatabaseClient from "@/util/server-database-client";

export default async function Header() {
    const supabase = serverDatabaseClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    return (
        <header>
            <div className="w-full from-blue-900 bg-gradient-to-br to-blue-700 p-1 text-sm md:text-base text-center text-white font-heading">
                Unlimited free picks • $20 daily prize to #1 performer
            </div>
            <nav className="bg-white border-gray-200 border-b dark:border-gray-700 px-4 lg:px-6 py-2.5 dark:bg-slate-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            width={48}
                            height={48}
                            alt="Krause Picks Logo"
                        />
                        <span className="sr-only">Krause Picks</span>
                    </Link>

                    {!user ? (
                        <div className="flex items-center font-heading lg:order-2">
                            <Link
                                href="/auth/login"
                                className="text-gray-800 dark:text-white transition duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-gray-800"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="text-white bg-blue-700 hover:bg-blue-800 transition duration-200 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Sign up
                            </Link>
                        </div>
                    ) : (
                        <LogoutButton />
                    )}
                </div>
            </nav>
        </header>
    );
}
