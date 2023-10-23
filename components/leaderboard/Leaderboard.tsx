import { CommunityLeaderboard, UserLeaderboard } from "@/types/custom.types";
import LeaderboardContent from "./LeaderboardContent";

async function fetchData(): Promise<{
    userLeaderboard: UserLeaderboard;
    communityLeaderboard: CommunityLeaderboard;
}> {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const userLeaderboardResponse = await fetch(
        `${
            process.env.NEXT_PUBLIC_API_URL
        }/leaderboard/users?since=${oneMonthAgo.toISOString()}`
    );
    const { leaderboard: userLeaderboard }: { leaderboard: UserLeaderboard } =
        await userLeaderboardResponse.json();

    const communityLeaderboardResponse = await fetch(
        `${
            process.env.NEXT_PUBLIC_API_URL
        }/leaderboard/communities?since=${oneMonthAgo.toISOString()}`
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

export default async function Leaderboard() {
    const { userLeaderboard, communityLeaderboard } = await fetchData();

    return (
        <div className="dark:bg-slate-800 overflow-hidden h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg">
            <LeaderboardContent
                topUserScores={userLeaderboard.slice(0, 5)}
                topCommunityScores={communityLeaderboard}
            />
        </div>
    );
}
