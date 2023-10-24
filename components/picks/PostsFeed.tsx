import serverDatabaseClient from "@/util/server-database-client";

import { SpreadPick } from "@/types/custom.types";
import PostCard from "./PostCard";
import { User } from "@supabase/supabase-js";

async function fetch(): Promise<{ picks: SpreadPick[]; user: User | null }> {
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
        picks: picks as SpreadPick[],
        user,
    };
}

export default async function PostsFeed() {
    const { picks, user } = await fetch();

    if (picks.length === 0)
        return (
            <div className="font-heading text-xl w-full h-full flex items-center justify-center text-gray-500">
                No recent picks.
            </div>
        );

    return (
        <div className="relative w-full h-full gap-4 shadow-md overflow-visible">
            <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll scrollbar-none">
                <div className="flex flex-col gap-4">
                    {picks.map((pick) => (
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
    );
}
