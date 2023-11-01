import UserPanel from "@/components/UserPanel";
import { Filters } from "@/components/common";
import { serverDatabaseClient } from "@/database";

export default async function LeaderboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const db = serverDatabaseClient();
    const {
        data: { user },
        error,
    } = await db.auth.getUser();
    const communities = await db.getCommunities();

    return (
        <div className="flex flex-col h-full gap-4 max-w-7xl mx-auto">
            <div className={`flex items-stretch flex-1 gap-4`}>
                <div className="flex-[2] max-w-full flex flex-col gap-4">
                    <div className="w-full h-12 relative">
                        <div className="overflow-x-scroll overflow-y-hidden absolute left-0 right-0 top-0 bottom-0 scrollbar-none">
                            <Filters
                                options={[
                                    { value: "0", label: "Global" },
                                    ...communities.map((c) => {
                                        return {
                                            image: c.logo_url || undefined,
                                            label: c.name,
                                            value: `${c.id}`,
                                        };
                                    }),
                                ]}
                                defaultOption={"0"}
                                searchParam="community"
                            />
                        </div>
                    </div>
                    <div className="w-full h-full relative pb-4">
                        {children}
                    </div>
                </div>
                {user && (
                    <div className="flex-1 lg:block hidden pb-4">
                        <UserPanel user={user} />
                    </div>
                )}
            </div>
        </div>
    );
}
