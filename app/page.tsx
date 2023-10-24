import PicksFeed from "@/components/picks/PostsFeed";
import Leaderboard from "@/components/leaderboard/Leaderboard";
import UserPanel from "@/components/UserPanel";
import GamesFeed from "@/components/games/GamesFeed";
import serverDatabaseClient from "@/util/server-database-client";

export default async function Home() {
    const supabase = serverDatabaseClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    return (
        <div className="flex flex-col h-full gap-4 max-w-7xl mx-auto">
            <div className="flex flex-0 w-full gap-2">
                <GamesFeed />
            </div>
            <div className={`flex items-stretch flex-1 gap-4`}>
                {user && (
                    <div className="flex-1 pb-4 hidden lg:block">
                        <UserPanel user={user} />
                    </div>
                )}
                <div className="flex-[2]">
                    <PicksFeed />
                </div>
                <div className="flex-1 pb-4 hidden xl:block">
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
}
