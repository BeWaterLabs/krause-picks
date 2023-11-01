import MetricDropdown from "@/components/leaderboard/MetricDropdown";

import LeaderboardContent from "@/components/leaderboard/LeaderboardContent";

export default async function Leaderboard({
    searchParams,
}: {
    searchParams: { community: string; show: string };
}) {
    return (
        <div className="dark:bg-slate-800 flex flex-col overflow-hidden h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md rounded-lg">
            <div className="flex items-start flex-0 justify-between p-4">
                <h2 className="text-2xl font-heading dark:text-white text-black font-semibold">
                    Leaderboard
                </h2>
                <MetricDropdown selected={searchParams.show} />
            </div>

            <div className="text-sm flex-1 relative text-left">
                <div className="absolute dark:scrollbar-thumb-slate-700 scrollbar-thin scrollbar-thumb-rounded-md dark:scrollbar-track-slate-800 left-0 right-0 top-0 bottom-0 overflow-y-scroll">
                    <LeaderboardContent
                        communityId={Number(searchParams.community)}
                        metric={searchParams.show}
                    />
                </div>
            </div>
        </div>
    );
}
