"use client";
import { UserStats, UserLeaderboard } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";
import { useState, useEffect } from "react";
import browserDatabaseClient from "@/database/BrowserDatabaseClient";
import UserList from "./UserList";
import todayPacificTime from "@/util/today-pacific-time";
import { Spinner } from "@/components/common";

async function getLeaderboard(
    metric: string,
    communityId?: number,
    startTime?: Date,
    endTime?: Date
) {
    const db = browserDatabaseClient();
    const picks = await db.getPicks(
        {
            communityId,
            from: startTime,
            to: endTime,
        },
        10000
    );
    const community = communityId ? await db.getCommunity(communityId) : null;

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

    const userLeaderboard: UserLeaderboard = Object.values(userScores).filter(
        (user) => user.stats.completedPicks > 0
    );

    switch (metric) {
        case "score":
            userLeaderboard.sort(
                (a, b) => b.stats.successfulPicks - a.stats.successfulPicks
            );
            break;
        case "accuracy":
            userLeaderboard.sort(
                (a, b) =>
                    b.stats.successfulPicks / b.stats.completedPicks -
                    a.stats.successfulPicks / a.stats.completedPicks
            );
            break;
        default:
            userLeaderboard.sort(
                (a, b) => b.stats.successfulPicks - a.stats.successfulPicks
            );
    }
    return { community, userLeaderboard };
}

function getTimestampFromPeriod(period: string) {
    switch (period) {
        case "all-time":
            return { start: undefined, end: undefined };
        case "past-week":
            const { start } = todayPacificTime(-6);
            return { start: start, end: new Date() };
        case "yesterday":
            const { start: startOfYesterday, end: endOfYesterday } =
                todayPacificTime(-1);
            return { start: startOfYesterday, end: endOfYesterday };
        default:
            return { start: undefined, end: undefined };
    }
}

export default function LeaderboardContent({
    metric,
    communityId,
    period,
}: {
    metric: string;
    period: string;
    communityId?: number;
}) {
    const { start, end } = getTimestampFromPeriod(period);
    const [userLeaderboard, setUserLeaderboard] = useState<UserLeaderboard>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getLeaderboard(metric, communityId, start, end).then(
            ({ userLeaderboard }) => {
                setUserLeaderboard(userLeaderboard);
                setLoading(false);
            }
        );
    }, [communityId, metric, period]);

    if (userLeaderboard.length === 0 || loading)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Spinner size={12} color="fill-gray-600" />
            </div>
        );

    return <UserList users={userLeaderboard} metric={metric} />;
}
