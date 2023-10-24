import serverDatabaseClient from "@/util/server-database-client";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = serverDatabaseClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (user !== null) {
        redirect("/");
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xs xl:p-0 dark:bg-slate-800 dark:border-gray-700">
                {children}
            </div>
        </div>
    );
}
