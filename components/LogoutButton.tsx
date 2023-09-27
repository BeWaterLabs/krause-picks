"use client";
import Link from "next/link";
import { useState } from "react";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        await fetch("/auth/logout", { method: "POST" });
        setLoading(false);
        window.location.reload();
    };

    return (
        <Link
            onClick={() => !loading && logout()}
            href="#"
            className={`text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-gray-800 ${
                loading ? "opacity-50 cursor-default" : ""
            }}`}
        >
            Logout
        </Link>
    );
}
