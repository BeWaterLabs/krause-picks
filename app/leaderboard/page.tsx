import { CommunityLeaderboard, UserLeaderboard } from "@/types/custom.types";
import LeaderboardContent from "@/components/leaderboard/LeaderboardContent";
import todayPacificTime from "@/util/today-pacific-time";
import { serverDatabaseClient } from "@/database";
import UserList from "@/components/leaderboard/UserList";
import { Row } from "@/types/database-helpers.types";

async function fetchData(): Promise<{
    userLeaderboard: UserLeaderboard;
    communityLeaderboard: CommunityLeaderboard;
}> {
    const { startOfTodayPT, endOfTodayPT } = todayPacificTime(-1);

    const userLeaderboardResponse = await fetch(
        `${
            process.env.NEXT_PUBLIC_API_URL
        }/leaderboard/users?from=${startOfTodayPT.toISOString()}&to=${endOfTodayPT.toISOString()}`
    );
    const { leaderboard: userLeaderboard }: { leaderboard: UserLeaderboard } =
        await userLeaderboardResponse.json();

    const communityLeaderboardResponse = await fetch(
        `${
            process.env.NEXT_PUBLIC_API_URL
        }/leaderboard/communities?from=${startOfTodayPT.toISOString()}&to=${endOfTodayPT.toISOString()}`
    );

    const {
        leaderboard: communityLeaderboard,
    }: { leaderboard: CommunityLeaderboard } =
        await communityLeaderboardResponse.json();

    return {
        userLeaderboard,
        communityLeaderboard,
    };
}

export default async function Leaderboard({
    searchParams,
}: {
    searchParams: { community: string };
}) {
    const db = serverDatabaseClient();
    const picks = await db.getPicks({
        communityId: Number(searchParams.community),
    });
    const community = searchParams.community
        ? await db.getCommunity(Number(searchParams.community))
        : null;

    const userScores = picks.reduce(
        (
            acc: {
                [user: string]: { score: number; account: Row<"accounts"> };
            },
            pick
        ) => {
            if (pick.successful) {
                if (!acc[pick.account.user_id]) {
                    acc[pick.account.user_id] = {
                        account: pick.account,
                        score: 10,
                    };
                } else {
                    acc[pick.account.user_id].score += 10;
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
                </div>

                <div className="text-sm flex-1 relative text-left">
                    <div className="absolute dark:scrollbar-thumb-slate-700 scrollbar-thin scrollbar-thumb-rounded-md dark:scrollbar-track-slate-800 left-0 right-0 top-0 bottom-0 overflow-y-scroll">
                        <UserList users={userLeaderboard} />
                    </div>
                </div>
            </div>
        </div>
    );
}
