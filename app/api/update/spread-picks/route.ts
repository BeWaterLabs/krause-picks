export const runtime = "edge";
export const revalidate = 0;

import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/types/database.types";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Insert } from "@/types/database-helpers.types";
import { Pick } from "@/types/custom.types";

async function fetchPicks(client: SupabaseClient<Database>): Promise<Pick[]> {
    const { data: picks, error: picksError } = await client
        .from("spread_picks")
        .select(
            "*, account: accounts!spread_picks_account_fkey(*), game: games!inner(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
        )
        .not("game.away_spread", "is", null)
        .not("game.home_spread", "is", null)
        .is("game.final", true)
        .is("successful", null);

    if (picksError) throw picksError;

    return picks as Pick[];
}

export async function GET(request: NextRequest) {
    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );

    let picks: Pick[] = [];
    try {
        picks = await fetchPicks(supabase);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

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

    if (updatedPicksError)
        return NextResponse.json(
            { error: updatedPicksError.message },
            { status: 500 }
        );

    console.info(`Updated ${updatedPicks.length} picks results.`);
    return NextResponse.json({ success: true });
}
