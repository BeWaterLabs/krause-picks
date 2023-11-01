import serverDatabaseClient from "@/util/server-database-client";

import { Pick } from "@/types/custom.types";
import PostCard from "@/components/picks/PostCard";
import { User } from "@supabase/supabase-js";
import UserPanel from "@/components/UserPanel";

async function fetch(): Promise<{ picks: Pick[]; user: User | null }> {
    const supabase = serverDatabaseClient();
    const { data: picks, error: picksError } = await supabase
        .from("spread_picks")
        .select(
            "*, account: accounts!spread_picks_account_fkey(*), game: games!inner(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
        )
        .gte("game.start", new Date().toISOString())
        .order("created_at", { ascending: false });

    if (picksError) throw new Error(picksError.message);

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    return {
        picks: picks as Pick[],
        user,
    };
}

export default async function Home() {
    const { picks, user } = await fetch();

    if (picks.length === 0)
        return (
            <div className="font-heading text-xl w-full h-full flex items-center justify-center text-gray-500">
                No recent picks.
            </div>
        );

    return (
        <div className="flex flex-col h-full gap-4 max-w-7xl mx-auto">
            <div className={`flex items-stretch flex-1 gap-4`}>
                <div className="flex-[2] relative">
                    <div className="absolute pb-4 left-0 scrollbar-none right-0 top-0 bottom-0 overflow-y-scroll overflow-scroll">
                        <div className="flex flex-col gap-4 pb-4">
                            {picks.slice(0, 50).map((pick) => (
                                <PostCard
                                    key={pick.id}
                                    pick={pick}
                                    otherPicks={picks.filter(
                                        (p) =>
                                            p.game.id === pick.game.id &&
                                            p.id !== pick.id
                                    )}
                                    user={user}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <UserPanel />
            </div>
        </div>
    );
}
