import serverDatabaseClient from "@/util/server-database-client";
import { redirect } from "next/navigation";

export default async function AuthLoading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full animate-pulse bg-white rounded-lg shadow h-48 dark:border md:mt-0 sm:max-w-xs xl:p-0 dark:bg-slate-800 dark:border-gray-700"></div>
        </div>
    );
}
