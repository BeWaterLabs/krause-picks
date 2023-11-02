import UserPanel from "@/components/UserPanel";
import { serverDatabaseClient } from "@/database";

export default async function GamesLayout({
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
                <div className="flex-[2] relative">
                    <div className="absolute pb-4 left-0 scrollbar-none right-0 top-0 bottom-0 overflow-y-scroll overflow-scroll">
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
