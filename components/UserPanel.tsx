import Image from "next/image";
import serverDatabaseClient from "@/util/server-database-client";

import { User } from "@supabase/supabase-js";
import {
    AccountWithCommunity,
    SpreadPick,
    UserStats,
} from "@/types/custom.types";

async function fetchData(user: User): Promise<{
    picks: SpreadPick[];
    account: AccountWithCommunity;
    stats: UserStats;
}> {
    const supabase = serverDatabaseClient();
    const { data: picks, error: picksError } = await supabase
        .from("spread_picks")
        .select(
            "*, account: accounts!spread_picks_account_fkey(*), game: games!inner(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
        )
        .gte("game.start", new Date().toISOString())
        .eq("account", user?.id || "")
        .order("created_at", { ascending: false });

    if (picksError) throw new Error(picksError.message);

    const { data: account, error: accountError } = await supabase
        .from("accounts")
        .select("*, community: communities!accounts_community_fkey(*)")
        .eq("user_id", user.id)
        .single();

    if (accountError) throw new Error(accountError.message);

    const statsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/users?user=${user.id}`
    );
    const { data: stats } = await statsResponse.json();

    return {
        picks: picks as SpreadPick[],
        account,
        stats: stats[account.user_id] as UserStats,
    };
}

export default async function UserPanel({ user }: { user: User }) {
    if (!user) return null;

    const { picks, account, stats } = await fetchData(user);

    return (
        <div className="dark:bg-slate-800 flex overflow-hidden flex-col h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg">
            <div className="p-6 flex flex-col h-full">
                <div className="w-full text-center flex flex-col items-center justify-center">
                    <div className="relative">
                        <Image
                            width={125}
                            height={125}
                            src={account.profile_picture_url}
                            alt=""
                            className="rounded-full"
                        />
                        {account.community?.logo_url && (
                            <div className="absolute bottom-0 right-0 w-8 h-8">
                                <Image
                                    src={account.community?.logo_url}
                                    alt=""
                                    width={30}
                                    height={30}
                                />
                            </div>
                        )}
                    </div>
                    <div className="mt-3 font-heading">
                        <h2 className="text-white text-lg font-semibold">
                            {account.display_name}
                        </h2>
                        <p className="text-gray-500">@{account.username}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 py-4">
                    <div className="flex flex-col -space-y-1">
                        <h3 className="text-center text-xl font-heading font-bold">
                            {stats.totalPicks}
                        </h3>
                        <h6 className="text-center text-gray-500">Picks</h6>
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <h3 className="text-center text-xl font-heading font-bold">
                            {stats.totalPicks > 0 && stats.rank
                                ? stats.rank
                                : "TBD"}
                        </h3>
                        <h6 className="text-center text-gray-500">Rank</h6>
                    </div>
                    <div className="flex flex-col -space-y-1">
                        <h3 className="text-center text-xl font-heading font-bold">
                            {stats.totalPicks > 0
                                ? Math.floor(stats.accuracy * 100) + "%"
                                : "TBD"}
                        </h3>
                        <h6 className="text-center text-gray-500">Accuracy</h6>
                    </div>
                </div>
                <div className="mt-4 h-full flex flex-col">
                    <h3 className="text-lg dark:text-white text-black font-semibold">
                        Recent Picks
                    </h3>
                    <div className="overflow-y-scroll scrollbar-track-transparent scrollbar-thumb-slate-700 scrollbar-none scrollbar-thumb-rounded-md flex flex-1 relative mt-3">
                        <div className="absolute top-0 flex gap-4 flex-col min-h-full right-0 left-0">
                            {picks.map((pick) => (
                                <div
                                    key={pick.id}
                                    className="flex gap-3 justify-between text-base items-center w-full"
                                >
                                    <div className="flex text-sm gap-3 text-gray-500 font-semibold items-center w-full">
                                        <Image
                                            src={
                                                pick.selection.icon_logo_url ||
                                                pick.selection.primary_logo_url
                                            }
                                            alt={`${pick.selection.full_name} logo`}
                                            width={125}
                                            height={125}
                                            className="w-auto h-7"
                                        />
                                        {pick.selection.full_name}
                                    </div>
                                    <div className="rounded-md w-16 flex justify-center py-1 text-sm bg-slate-700">
                                        {pick.spread > 0 ? "+" : ""}
                                        {pick.spread}
                                    </div>
                                </div>
                            ))}
                            {picks.length === 0 && (
                                <div className="flex justify-center items-center h-full">
                                    <h6 className="text-gray-500">
                                        No picks made today
                                    </h6>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 items-center p-6 text-white font-heading flex justify-between bg-gradient-to-br border-t dark:border-gray-700 text-sm gap-2">
                {/* <p className="text-xl">Prize Pool</p>
                <h2 className="text-5xl font-bold">$20</h2> */}
            </div>
        </div>
    );
}
