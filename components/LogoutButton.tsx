"use client";
import Link from "next/link";

export default function LogoutButton() {
    return (
        <Link
            onClick={() => fetch("/auth/logout", { method: "POST" })}
            href="#"
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-gray-800"
        >
            Logout
        </Link>
    );
}
