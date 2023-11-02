import MetricDropdown from "@/components/leaderboard/MetricDropdown";

import LeaderboardContent from "@/components/leaderboard/LeaderboardContent";
import PeriodDropdown from "@/components/leaderboard/PeriodDropdown";

export default async function Leaderboard({
    searchParams,
}: {
    searchParams: { community: string; show: string; period: string };
}) {
    return (
        <div className="dark:bg-slate-800 flex flex-col overflow-hidden h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md rounded-lg">
            <div className="flex flex-col lg:flex-row gap-2 items-start flex-0 justify-between p-4">
                <h2 className="text-2xl font-heading dark:text-white text-black font-semibold">
                    Leaderboard
                </h2>
                <div className="flex gap-2">
                    <PeriodDropdown selected={searchParams.period} />
                    <MetricDropdown selected={searchParams.show} />
                </div>
            </div>

            <div className="text-sm flex-1 relative text-left">
                <div className="absolute dark:scrollbar-thumb-slate-700 scrollbar-thin scrollbar-thumb-rounded-md dark:scrollbar-track-slate-800 left-0 right-0 top-0 bottom-0 overflow-y-scroll">
                    <LeaderboardContent
                        period={searchParams.period}
                        communityId={Number(searchParams.community)}
                        metric={searchParams.show}
                    />
                </div>
            </div>
        </div>
    );
}
