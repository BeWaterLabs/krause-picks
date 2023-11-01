import Image from "next/image";

import { UserLeaderboard, UserStats } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";

enum Metric {
    Score = "score",
    Accuracy = "accuracy",
}

function UserListing({
    account,
    stats,
    metric,
}: {
    account: Row<"accounts">;
    stats: UserStats;
    metric: string;
}) {
    let score = "0";
    switch (metric) {
        case Metric.Score:
            score = `${stats.successfulPicks * 10}`;
            break;
        case Metric.Accuracy:
            score = `${Math.floor(
                (stats.successfulPicks / stats.completedPicks) * 100
            )}%`;
            break;
        default:
            score = `${stats.successfulPicks * 10}`;
    }

    return (
        <div className="border-b flex justify-between items-center dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50">
            <div className="flex w-full items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="relative">
                    <Image
                        className="w-10 h-10 rounded-full"
                        src={account.profile_picture_url}
                        alt={`${account.username} profile image`}
                        width={40}
                        height={40}
                    />
                </div>
                <div className="pl-3">
                    <div className="text-base font-semibold">
                        {account.display_name}
                    </div>
                    <div className="font-normal text-gray-400 flex gap-1">
                        @{account.username}
                    </div>
                </div>
            </div>
            <div className="pr-6 font-heading py-4 text-2xl text-center font-semibold">
                {score}
            </div>
        </div>
    );
}

export default function UserList({
    users,
    metric,
}: {
    users: UserLeaderboard;
    metric: string;
}) {
    return (
        <div className="flex flex-col">
            {users.map((userWithScore, idx) => (
                <UserListing
                    key={userWithScore.account.user_id}
                    account={userWithScore.account}
                    stats={userWithScore.stats}
                    metric={metric}
                />
            ))}
        </div>
    );
}
