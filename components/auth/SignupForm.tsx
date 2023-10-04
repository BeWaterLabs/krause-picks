"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiTwitterXFill } from "react-icons/ri";
import toast from "react-hot-toast";
import createBrowserClient from "@/util/browser-database-client";

export default function SignupForm() {
    const router = useRouter();

    const signup = async (e: any) => {
        e.preventDefault();

        if (e.target.password.value !== e.target["confirm-password"].value) {
            alert("Passwords do not match");
            return;
        }
        const supabase = createBrowserClient();

        const { data, error } = await supabase.auth.signUp({
            email: e.target.email.value,
            password: e.target.password.value,
        });

        if (error) toast.error(error.message);
        else router.refresh();
    };

    const loginWithTwitter = async () => {
        const supabase = createBrowserClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "twitter",
            options: {
                redirectTo:
                    process.env.NODE_ENV === "production"
                        ? "https://krausepicks.com/auth/callback"
                        : "http://localhost:3000/auth/callback",
            },
        });

        if (error) toast.error(error.message);
        else router.refresh();
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={signup}>
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
            <div>
                <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Sign up
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
                    Sign up with X
                </button>
            </div>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    Login
                </Link>
            </p>
        </form>
    );
}
