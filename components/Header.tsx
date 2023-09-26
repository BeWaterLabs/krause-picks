import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    return (
        <header>
            <nav className="bg-white border-gray-200 border-b dark:border-gray-700 px-4 lg:px-6 py-2.5 dark:bg-slate-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div>
                        <Image
                            src="/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            width={48}
                            height={48}
                            alt="Krause Picks Logo"
                        />
                        <span className="sr-only">Krause Picks</span>
                    </div>

                    {!user ? (
                        <div className="flex items-center lg:order-2">
                            <Link
                                href="/auth/login"
                                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-gray-800"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
