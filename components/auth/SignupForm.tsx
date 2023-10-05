"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiTwitterXFill } from "react-icons/ri";
import { BsDiscord } from "react-icons/bs";
import toast from "react-hot-toast";
import createBrowserClient from "@/util/browser-database-client";
import { Provider } from "@supabase/supabase-js";

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

    const loginWithOAuth = async (provider: Provider) => {
        const supabase = createBrowserClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL,
            },
        });

        if (error) toast.error(error.message);
        else router.refresh();
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <button
                type="button"
                onClick={() => loginWithOAuth("twitter")}
                className="w-full text-white bg-blue-400 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-gray-900"
            >
                <RiTwitterXFill className="inline-block w-4 h-4 mr-2" />
                Sign up with X
            </button>
            <button
                type="button"
                onClick={() => loginWithOAuth("discord")}
                className="w-full text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-900 dark:hover:bg-indigo-700 dark:focus:ring-indigo-700"
            >
                <BsDiscord className="inline-block w-4 h-4 mr-2" />
                Sign up with Discord
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}
