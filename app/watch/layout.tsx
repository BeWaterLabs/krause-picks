import UserPanel from "@/components/UserPanel";
import { Filters } from "@/components/common";
import { serverDatabaseClient } from "@/database";

export default async function WatchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const db = serverDatabaseClient();
    const {
        data: { user },
        error,
    } = await db.auth.getUser();

    return (
        <div className="flex flex-col h-full gap-4 max-w-7xl mx-auto">
            <div className={`flex items-stretch flex-1 gap-4`}>
                <div className="flex-[2] max-w-full flex flex-col gap-4">
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
