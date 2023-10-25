export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import { UserLeaderboard } from "@/types/custom.types";

export async function GET(request: NextRequest) {
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const isoLastYear = lastYear.toISOString().slice(0, 19) + "Z";

    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from") || isoLastYear;
    const to = searchParams.get("to") || new Date().toISOString();

    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );

    const { data: picks, error: picksError } = await supabase
        .from("spread_picks")
        .select(
            "*, account: accounts!inner(*, community: communities!accounts_community_fkey(*)), game: games!inner(*)"
        )
        .not("successful", "is", null)
        .gte("game.start", from)
        .lte("game.start", to);

    if (picksError)
        return new NextResponse(picksError.message, { status: 500 });

    let leaderboard: UserLeaderboard = [];
    let usersSet = new Set();

    picks.forEach((pick) => {
        if (!usersSet.has(pick.account.user_id)) {
            usersSet.add(pick.account.user_id);
            leaderboard.push({
                account: pick.account,
                score: 0,
            });
        }
        if (pick.successful) {
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
