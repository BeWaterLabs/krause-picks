import PickCard from "./PickCard";
import serverDatabaseClient from "@/util/server-database-client";

import { SpreadPick } from "@/types/custom.types";

async function fetch(): Promise<SpreadPick[]> {
    const supabase = serverDatabaseClient();
    const { data, error } = await supabase
        .from("spread_picks")
        .select(
            "*, account: accounts!spread_picks_account_fkey(*), game: games!spread_picks_game_fkey(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
        )
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data as SpreadPick[];
}

export default async function PicksFeed() {
    const picks = await fetch();

    return (
        <div className="relative w-full h-full gap-4 shadow-md overflow-visible">
            <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-scroll scrollbar-none">
                <div className="flex flex-col gap-4">
                    {picks.map((pick) => (
                        <PickCard
                            key={pick.id}
                            pick={pick}
                            accounts={picks
                                .filter((p) => p.id !== pick.id)
                                .flatMap((p) => p.account)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
