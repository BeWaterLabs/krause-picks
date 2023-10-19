import Image from "next/image";
import serverDatabaseClient from "@/util/server-database-client";

import { Row } from "@/types/database-helpers.types";
import { User } from "@supabase/supabase-js";
import { SpreadPick } from "@/types/custom.types";

async function fetch(
    user: User
): Promise<{ picks: SpreadPick[]; account: Row<"accounts"> }> {
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
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (accountError) throw new Error(accountError.message);

    return {
        picks: picks as SpreadPick[],
        account,
    };
}

export default async function UserPanel({ user }: { user: User }) {
    if (!user) return null;

    const { picks, account } = await fetch(user);

    return (
        <div className="dark:bg-slate-800 p-6 flex overflow-hidden flex-col h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg">
            <div className="w-full text-center flex flex-col items-center justify-center">
                <Image
                    width={125}
                    height={125}
                    src={account.profile_picture_url}
                    alt=""
                    className="rounded-full"
                />
                <div className="mt-3">
                    <h2 className="text-white text-lg font-semibold">
                        {account.display_name}
                    </h2>
                    <p className="text-gray-500">@{account.username}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 py-4">
                <div>
                    <h3 className="text-center font-bold">{picks.length}</h3>
                    <h6 className="text-center text-gray-500">Picks</h6>
                </div>
                <div>
                    <h3 className="text-center font-bold">TBD</h3>
                    <h6 className="text-center text-gray-500">Rank</h6>
                </div>
                <div>
                    <h3 className="text-center font-bold">TBD</h3>
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
            <div className="mt-8 opacity-50 text-sm flex flex-col gap-2">
                <div className="flex gap-2">
                    <Image
                        src="/x.svg"
                        className="w-4"
                        alt=""
                        width={20}
                        height={20}
                    />{" "}
                    Coming soon
                </div>
                <div className="flex gap-2">
                    <Image
                        src="/farcaster.svg"
                        className="w-4"
                        alt=""
                        width={20}
                        height={20}
                    />{" "}
                    Coming soon
                </div>
            </div>
        </div>
    );
}
