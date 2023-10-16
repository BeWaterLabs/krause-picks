import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/types/database.types";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Insert, Row, Update } from "@/types/database-helpers.types";
import { SpreadPick } from "@/types/custom.types";

export const dynamic = "force-dynamic";

async function fetchPicks(
    client: SupabaseClient<Database>
): Promise<SpreadPick[]> {
    const { data: picks, error: picksError } = await client
        .from("spread_picks")
        .select(
            "*, account: accounts!spread_picks_account_fkey(*), game: games!inner(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
        )
        .not("game.away_spread", "is", null)
        .not("game.home_spread", "is", null)
        .is("game.final", true)
        .is("successful", null);

    if (picksError) throw new Error(picksError.message);

    return picks as SpreadPick[];
}

export async function GET(request: NextRequest) {
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );
    const picks = await fetchPicks(supabase);
    const upsertPicks: Insert<"spread_picks">[] = [];

    for (let pick of picks) {
        const homeScore = pick.game.home_score;
        const awayScore = pick.game.away_score;
        const selectionScore =
            pick.selection.id === pick.game.home_team.id
                ? homeScore
                : awayScore;
        const opposingScore =
            pick.selection.id === pick.game.home_team.id
                ? awayScore
                : homeScore;
        upsertPicks.push({
            id: pick.id,
            account: pick.account.user_id,
            game: pick.game.id,
            selection: pick.selection.id,
            spread: pick.spread,
            successful: selectionScore! + pick.spread > opposingScore!,
        });
    }

    const { data: updatedPicks, error: updatedPicksError } = await supabase
        .from("spread_picks")
        // we have to use upsert for bulk operations
        .upsert(upsertPicks, { onConflict: "id" })
        .select();

    if (updatedPicksError) throw new Error(updatedPicksError.message);

    console.info(`Updated ${updatedPicks.length} picks results.`);
    return NextResponse.json({ success: true });
}
