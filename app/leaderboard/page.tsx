import { UserLeaderboard, UserStats } from "@/types/custom.types";
import { serverDatabaseClient } from "@/database";
import UserList from "@/components/leaderboard/UserList";
import { Row } from "@/types/database-helpers.types";
import MetricDropdown from "@/components/leaderboard/MetricDropdown";

export default async function Leaderboard({
    searchParams,
}: {
    searchParams: { community: string; show: string };
}) {
    const db = serverDatabaseClient();
    const picks = await db.getPicks({
        communityId: Number(searchParams.community),
    });
    const community = searchParams.community
        ? await db.getCommunity(Number(searchParams.community))
        : null;
    const metric = searchParams.show;

    const userScores = picks
        .filter((p) => p.account)
        .reduce(
            (
                acc: {
                    [user: string]: {
                        stats: UserStats;
                        account: Row<"accounts">;
                    };
                },
                pick
            ) => {
                if (!acc[pick.account.user_id]) {
                    acc[pick.account.user_id] = {
                        account: pick.account,
                        stats: {
                            totalPicks: 0,
                            completedPicks: 0,
                            successfulPicks: 0,
                        },
                    };
                }

                acc[pick.account.user_id].stats.totalPicks++;
                if (pick.successful !== null) {
                    acc[pick.account.user_id].stats.completedPicks++;
                    if (pick.successful) {
                        acc[pick.account.user_id].stats.successfulPicks++;
                    }
                }

                return acc;
            },
            {}
        );

    const userLeaderboard: UserLeaderboard = Object.values(userScores);

    return (
        <div className="dark:bg-slate-800 overflow-hidden h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg">
            <div className="flex overflow-hidden flex-col h-full">
                <div className="flex items-start flex-0 justify-between p-4">
                    <h2 className="text-2xl font-heading dark:text-white text-black font-semibold">
                        <p className="text-xs font-body text-white/50 font-medium">
                            {searchParams.community
                                ? community?.name
                                : "Global"}
                        </p>
                        Leaderboard
                    </h2>
                    <MetricDropdown selected={metric} />
                </div>

                <div className="text-sm flex-1 relative text-left">
                    <div className="absolute dark:scrollbar-thumb-slate-700 scrollbar-thin scrollbar-thumb-rounded-md dark:scrollbar-track-slate-800 left-0 right-0 top-0 bottom-0 overflow-y-scroll">
                        <UserList users={userLeaderboard} metric={metric} />
                    </div>
                </div>
            </div>
        </div>
    );
}
