import LoginForm from "@/components/auth/LoginForm";
import serverDatabaseClient from "@/util/server-database-client";
import Image from "next/image";

const fetchCommunity = async (community: number) => {
    const supabase = serverDatabaseClient();
    const { data, error } = await supabase
        .from("communities")
        .select("*")
        .eq("id", community)
        .single();

    if (error) throw new Error(error.message);

    return data;
};

export default async function LoginPage({
    searchParams,
}: {
    searchParams: { community: number };
}) {
    const community = searchParams.community
        ? await fetchCommunity(searchParams.community)
        : undefined;

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {community?.logo_url ? (
                <Image
                    src={community?.logo_url}
                    width={200}
                    height={200}
                    alt={`${community?.name} logo`}
                    className="mx-auto w-32 mb-8 h-auto"
                />
            ) : (
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login
                </h1>
            )}

            <LoginForm community={community} />
        </div>
    );
}
