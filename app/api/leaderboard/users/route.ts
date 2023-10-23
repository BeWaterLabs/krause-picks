import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import { AccountWithCommunity, UserLeaderboard } from "@/types/custom.types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const isoLastYear = lastYear.toISOString().slice(0, 19) + "Z";

    const searchParams = request.nextUrl.searchParams;
    const since = searchParams.get("since") || isoLastYear;

    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );

    const { data: picks, error: picksError } = await supabase
        .from("spread_picks")
        .select(
            "*, account: accounts!inner(*, community: communities!accounts_community_fkey(*)), game: games!inner(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
        )
        .not("successful", "is", null)
        .gte("game.start", since);

    if (picksError) throw new Error(picksError.message);

    let leaderboard: UserLeaderboard = [];
    let usersSet = new Set();

    picks.forEach((pick) => {
        if (!usersSet.has(pick.account.user_id)) {
            usersSet.add(pick.account.user_id);
            leaderboard.push({
                account: pick.account,
                score: 10,
            });
        } else {
            let userWithScore = leaderboard.find(
                (userWithScore) =>
                    userWithScore.account.user_id === pick.account.user_id
            )!;
            userWithScore.score += 10;
        }
    });
    leaderboard.sort((a, b) => b.score - a.score);

    return NextResponse.json({ leaderboard });
}
