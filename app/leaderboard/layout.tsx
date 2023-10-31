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
            <Filters
                options={[
                    { value: 0, label: "Global" },
                    ...communities.map((c) => {
                        return {
                            image: c.logo_url || undefined,
                            label: c.name,
                            value: c.id,
                        };
                    }),
                ]}
                defaultOption={0}
                searchParam="community"
            />
            <div className={`flex items-stretch flex-1 gap-4`}>
                <div className="flex-[2] relative">
                    <div className="absolute pb-4 left-0 scrollbar-none right-0 top-0 bottom-0 overflow-y-scroll overflow-scroll">
                        {children}
                    </div>
                </div>
                {user && (
                    <div className="flex-1 pb-4 hidden lg:block">
                        <UserPanel user={user} />
                    </div>
                )}
            </div>
        </div>
    );
}
