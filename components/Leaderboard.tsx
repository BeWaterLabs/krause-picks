import Image from "next/image";
import serverDatabaseClient from "@/util/server-database-client";

import { SpreadPick } from "@/types/custom.types";
import { User } from "@supabase/supabase-js";
import { Row } from "@/types/database-helpers.types";

async function fetch(): Promise<{ picks: SpreadPick[]; user: User | null }> {
    const supabase = serverDatabaseClient();
    const { data: picks, error: picksError } = await supabase
        .from("spread_picks")
        .select(
            "*, account: accounts!spread_picks_account_fkey(*), game: games!inner(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
        )
        .not("successful", "is", null);

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

export default async function Leaderboard() {
    const { picks, user } = await fetch();
    let usersWithScores: { account: Row<"accounts">; score: number }[] = [];
    let usersSet = new Set();

    picks.forEach((pick) => {
        if (!usersSet.has(pick.account.user_id)) {
            usersSet.add(pick.account.user_id);
            usersWithScores.push({
                account: pick.account,
                score: 10,
            });
        } else {
            let userWithScore = usersWithScores.find(
                (userWithScore) =>
                    userWithScore.account.user_id === pick.account.user_id
            )!;
            userWithScore.score += 10;
        }
    });
    usersWithScores.sort((a, b) => b.score - a.score);

    return (
        <div className="dark:bg-slate-800 flex overflow-hidden flex-col h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg">
            <div className="flex items-center flex-0 justify-start p-4">
                <h2 className="text-xl dark:text-white text-black font-semibold">
                    Leaderboard
                </h2>
            </div>

            <div className="text-sm flex-1 relative text-left">
                <div className="absolute dark:scrollbar-thumb-slate-700 scrollbar-thin scrollbar-thumb-rounded-md dark:scrollbar-track-slate-800 left-0 right-0 top-0 bottom-0 overflow-y-scroll">
                    <div className="flex flex-col">
                        {usersWithScores.map((userWithScore) => (
                            <div
                                key={userWithScore.account.user_id}
                                className="border-b flex justify-between items-center dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                            >
                                <div className="flex w-full items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="relative">
                                        <Image
                                            className="w-10 h-10 rounded-full"
                                            src={
                                                userWithScore.account
                                                    .profile_picture_url
                                            }
                                            alt={`${userWithScore.account.username} profile image`}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            {userWithScore.account.display_name}
                                        </div>
                                        <div className="font-normal text-gray-400 flex gap-1">
                                            @{userWithScore.account.username}
                                        </div>
                                    </div>
                                </div>
                                <div className="pr-6 py-4 text-xl text-center font-semibold">
                                    {userWithScore.score}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
