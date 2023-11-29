export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";

import DatabaseClient from "@/database/DatabaseClient";
import { UserStats, UserLeaderboard } from "@/types/custom.types";
import { Insert, Row } from "@/types/database-helpers.types";
import adminDatabaseClient from "@/database/AdminDatabaseClient";
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

// export async function GET(request: NextRequest) {
//     const searchParams = request.nextUrl.searchParams;
//     const days = searchParams.get("days") || "1";

//     const db = adminDatabaseClient();

//     const { start } = todayPacificTime(-1 * parseInt(days));

//     const leaderboard = await getLeaderboard(db, start);

//     return NextResponse.json({ success: true, leaderboard });
// }

export async function GET() {
    const db = adminDatabaseClient();
    const currentLeaderboard = await db.getLeaderboard();
    const current = currentLeaderboard.data ? currentLeaderboard.data : null;

    let wasTie = false;
    // if there's a tie, add to the existing scores
    if (
        current != null &&
        current.length > 0 &&
        current[0].score === current[1].score
    ) {
        wasTie = true;
    }

    const { start, end } = todayPacificTime(-1);
    const yesterdayResults = await getLeaderboard(db, start, end);
    const newRows: Insert<"leaderboard">[] = [];
    yesterdayResults.forEach((score) => {
        if (wasTie) {
            const usersCurrent = current!.find(
                (u) => u.user === score.account.user_id
            );
            const usersCurrentScore = usersCurrent ? usersCurrent.score : 0;
            newRows.push({
                user: score.account.user_id,
                score: (score.stats.successfulPicks + usersCurrentScore) * 10,
            });
        } else {
            newRows.push({
                user: score.account.user_id,
                score: score.stats.successfulPicks * 10,
            });
        }
    });

    await db.postLeaderboard(newRows);

    return NextResponse.json({ success: true });
}
