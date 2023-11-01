"use client";
import { UserStats, UserLeaderboard } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";
import { useState, useEffect } from "react";
import browserDatabaseClient from "@/database/BrowserDatabaseClient";
import UserList from "./UserList";

async function getLeaderboard(metric: string, communityId?: number) {
    const db = browserDatabaseClient();
    const picks = await db.getPicks(
        {
            communityId,
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

export default function LeaderboardContent({
    metric,
    communityId,
}: {
    metric: string;
    communityId?: number;
}) {
    const [community, setCommunity] = useState<null | Row<"communities">>(null);
    const [userLeaderboard, setUserLeaderboard] = useState<UserLeaderboard>([]);
    useEffect(() => {
        getLeaderboard(metric, communityId).then(
            ({ community, userLeaderboard }) => {
                setCommunity(community);
                setUserLeaderboard(userLeaderboard);
            }
        );
    }, [communityId, metric]);

    if (!userLeaderboard) return null;

    return <UserList users={userLeaderboard} metric={metric} />;
}