export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";

import DatabaseClient from "@/database/DatabaseClient";
import { UserStats, UserLeaderboard } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";
import routeDatabaseClient from "@/database/RouteDatabaseClient";
import todayPacificTime from "@/util/today-pacific-time";

async function getLeaderboard(
    db: DatabaseClient,
    startTime?: Date,
    endTime?: Date
) {
    const picks = await db.getPicks(
        {
            from: startTime,
            to: endTime,
        },
        10000
    );

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

    userLeaderboard.sort(
        (a, b) => b.stats.successfulPicks - a.stats.successfulPicks
    );

    return userLeaderboard;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const days = searchParams.get("days") || "1";

    const db = routeDatabaseClient();

    const { start } = todayPacificTime(-1 * parseInt(days));

    const leaderboard = await getLeaderboard(db, start);

    return NextResponse.json({ success: true, leaderboard });
}
