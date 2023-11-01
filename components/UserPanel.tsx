import Image from "next/image";

import { User } from "@supabase/supabase-js";
import {
    AccountWithCommunity,
    Game,
    Pick,
    UserStats,
} from "@/types/custom.types";
import { serverDatabaseClient } from "@/database";
import FinalizedPick from "./picks/FinalizedPick";
import PendingPick from "./picks/PendingPick";
import QuickPick from "./picks/QuickPick";

async function fetchData(user: User): Promise<{
    games: Game[];
    picks: Pick[];
    account: AccountWithCommunity;
    stats: UserStats;
}> {
    const db = serverDatabaseClient();

    const picks = await db.getPicks({
        userId: user.id,
    });

    const games = await db.getGames({
        from: new Date(),
    });

    const account = await db.getAccountWithCommunity(user.id);

    const statsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/users?user=${user.id}`
    );
    const { data: stats } = await statsResponse.json();

    return {
        games,
        picks: picks as Pick[],
        account,
        stats: stats[account.user_id] as UserStats,
    };
}

export default async function UserPanel({ user }: { user: User }) {
    const { games, picks, account, stats } = await fetchData(user);

    return (
        <div className="dark:bg-slate-800 p-6 flex overflow-hidden flex-col h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md rounded-lg">
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
                    <h2 className="text-white text-xl font-semibold">
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
                        {stats.completedPicks > 0 && stats.rank
                            ? stats.rank
                            : "TBD"}
                    </h3>
                    <h6 className="text-center text-gray-500">Rank</h6>
                </div>
                <div className="flex flex-col -space-y-1">
                    <h3 className="text-center text-xl font-heading font-bold">
                        {stats.completedPicks > 0
                            ? Math.floor(
                                  (stats.successfulPicks /
                                      stats.completedPicks) *
                                      100
                              ) + "%"
                            : "TBD"}
                    </h3>
                    <h6 className="text-center text-gray-500">Accuracy</h6>
                </div>
            </div>
            <div className="h-full relative overflow-y-scroll scrollbar-none scrollbar-thumb-rounded-md scrollbar-track-transparent scrollbar-thumb-slate-700">
                <div className="absolute top-0 flex flex-col min-h-full right-0 left-0">
                    <h3 className="text-xl mt-6 font-heading dark:text-white text-black font-semibold">
                        Quick Picks
                    </h3>
                    <div className="flex flex-col gap-4 mt-3">
                        {games.map((game) => {
                            const pick = picks.find(
                                (pick) => pick.game.id === game.id
                            );

                            return (
                                <QuickPick
                                    key={game.id}
                                    game={game}
                                    selection={pick?.selection}
                                />
                            );
                        })}
                    </div>
                    <h3 className="text-xl mt-6 font-heading dark:text-white text-black font-semibold">
                        Past Picks
                    </h3>
                    <div className="flex flex-col gap-4 mt-3">
                        {picks
                            .filter((p) => p.successful !== null)
                            .map((pick) => (
                                <FinalizedPick key={pick.id} pick={pick} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
