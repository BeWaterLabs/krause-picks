import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import { UserLeaderboard, UserStats } from "@/types/custom.types";

export async function GET(request: NextRequest) {
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );

    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("user");

    const { data: picks, error: picksError } = userId
        ? await supabase
              .from("spread_picks")
              .select(
                  "account: accounts!spread_picks_account_fkey(*), successful"
              )
              .eq("account.user_id", userId)
        : await supabase
              .from("spread_picks")
              .select(
                  "account: accounts!spread_picks_account_fkey(*), successful"
              );

    if (picksError)
        return new NextResponse(picksError.message.toString(), { status: 500 });

    const leaderboardResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/users`
    );
    const leaderboard = (await leaderboardResponse.json())
        .leaderboard as UserLeaderboard;

    const userStats: { [user: string]: UserStats } = {};
    // guarantee requested user exists in response
    if (userId)
        userStats[userId] = {
            successfulPicks: 0,
            totalPicks: 0,
            accuracy: 0,
            pendingPicks: 0,
            completedPicks: 0,
        };

    picks.forEach((pick) => {
        if (!pick.account?.user_id) return;

        if (!userStats[pick.account?.user_id]) {
            userStats[pick.account?.user_id] = {
                successfulPicks: 0,
                totalPicks: 0,
                accuracy: 0,
                pendingPicks: 0,
                completedPicks: 0,
            };
        }

        if (pick.successful === null) {
            userStats[pick.account.user_id].pendingPicks++;
        } else {
            userStats[pick.account.user_id].completedPicks++;
        }

        userStats[pick.account.user_id].totalPicks++;

        if (pick.successful) {
            userStats[pick.account.user_id].successfulPicks++;
        }
    });

    for (const userId in userStats) {
        userStats[userId].accuracy =
            userStats[userId].successfulPicks /
            (userStats[userId].totalPicks || 1);
        userStats[userId].rank =
            leaderboard.findIndex((i) => i.account.user_id === userId) + 1;
    }

    return NextResponse.json({
        success: true,
        data: userStats,
    });
}
