"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiTwitterXFill } from "react-icons/ri";
import { BsDiscord } from "react-icons/bs";
import toast from "react-hot-toast";
import createBrowserClient from "@/util/browser-database-client";
import { Provider } from "@supabase/supabase-js";
import { Row } from "@/types/database-helpers.types";
import { useState } from "react";
import { Spinner } from "@/components/common";

export default function SignupForm({
    community,
}: {
    community?: Row<"communities">;
}) {
    const router = useRouter();
    const [xLoading, setXLoading] = useState(false);
    const [discordLoading, setDiscordLoading] = useState(false);

    const commuityParam = community ? `?community=${community.id}` : "";

    const signupWithOAuth = async (provider: Provider) => {
        const supabase = createBrowserClient();

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo:
                    process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL + commuityParam,
            },
        });
        if (error) toast.error(error.message);
    };

    return (
        <div className="space-y-4">
            <button
                type="button"
                onClick={() => {
                    setXLoading(true);
                    signupWithOAuth("twitter");
                }}
                disabled={discordLoading || xLoading}
                className={`w-full text-white flex justify-center items-center bg-blue-400 hover:bg-gray-900 duration-200 transition focus:ring-2 focus:outline-none focus:ring-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-gray-900 ${
                    xLoading || discordLoading
                        ? "opacity-50 cursor-default"
                        : ""
                }}`}
            >
                {xLoading ? (
                    <Spinner />
                ) : (
                    <RiTwitterXFill className="inline-block w-4 h-4 mr-2" />
                )}
                Signup with X
            </button>
            <button
                type="button"
                onClick={() => {
                    setDiscordLoading(true);
                    signupWithOAuth("discord");
                }}
                disabled={discordLoading || xLoading}
                className={`w-full text-white flex justify-center items-center duration-200 transition bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800 ${
                    xLoading || discordLoading
                        ? "opacity-50 cursor-default"
                        : ""
                }"}`}
            >
                {discordLoading ? (
                    <Spinner />
                ) : (
                    <BsDiscord className="inline-block w-4 h-4 mr-2" />
                )}
                Signup with Discord
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
