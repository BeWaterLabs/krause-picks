"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiTwitterXFill } from "react-icons/ri";
import createBrowserClient from "@/util/browser-database-client";

export default function SignupForm() {
    const router = useRouter();

    const login = async (e: any) => {
        e.preventDefault();

        const supabase = createBrowserClient();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: e.target.email.value,
            password: e.target.password.value,
        });

        if (error) alert(error.message);
        else router.refresh();
    };

    const loginWithTwitter = async () => {
        const supabase = createBrowserClient();
        console.log(process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL);

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "twitter",
            options: {
                redirectTo: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL,
            },
        });

        if (error) toast.error(error.message);
        else router.refresh();
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={login}>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Login
            </button>
            <div>
                <div className="flex mb-4 items-center text-gray-500 gap-4 justify-center">
                    <div className="h-[1px] bg-gray-700 w-full" />
                    or
                    <div className="h-[1px] bg-gray-700 w-full" />
                </div>
                <button
                    type="button"
                    onClick={loginWithTwitter}
                    className="w-full text-white bg-blue-400 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-gray-900"
                >
                    <RiTwitterXFill className="inline-block w-4 h-4 mr-2" />
                    Login with X
                </button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                    href="/auth/signup"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    Sign up
                </Link>
            </p>
        </form>
    );
}
