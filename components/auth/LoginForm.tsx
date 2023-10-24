"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiTwitterXFill } from "react-icons/ri";
import { BsDiscord } from "react-icons/bs";
import createBrowserClient from "@/util/browser-database-client";
import { Provider } from "@supabase/supabase-js";
import { Row } from "@/types/database-helpers.types";

export default function LoginForm({
    community,
}: {
    community?: Row<"communities">;
}) {
    const router = useRouter();

    const commuityParam = community ? `?community=${community.id}` : "";

    const loginWithOAuth = async (provider: Provider) => {
        const supabase = createBrowserClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo:
                    process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL + commuityParam,
            },
        });

        if (error) toast.error(error.message);
        else router.refresh();
    };

    return (
        <div className="space-y-4">
            <button
                type="button"
                onClick={() => loginWithOAuth("twitter")}
                className="w-full text-white bg-blue-400 hover:bg-gray-900 duration-200 transition focus:ring-2 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-gray-900"
            >
                <RiTwitterXFill className="inline-block w-4 h-4 mr-2" />
                Login with X
            </button>
            <button
                type="button"
                onClick={() => loginWithOAuth("discord")}
                className="w-full text-white duration-200 transition bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
            >
                <BsDiscord className="inline-block w-4 h-4 mr-2" />
                Login with Discord
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                    href="/auth/signup"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
}
