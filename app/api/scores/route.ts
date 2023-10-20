import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/types/database.types";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Insert, Row } from "@/types/database-helpers.types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const updateScore = async (
    game: any,
    teams: Row<"teams">[],
    client: SupabaseClient<Database>
) => {
    const homeTeamId = teams.find((t) => t.full_name === game.home_team)?.id;
    const awayTeamId = teams.find((t) => t.full_name === game.away_team)?.id;

    if (!homeTeamId) throw new Error(`Unknown home team ${game.home_team}`);
    if (!awayTeamId) throw new Error(`Unknown away team ${game.away_team}`);

    const upsertedGame: Insert<"games"> = {
        odds_api_id: game.id,
        start: game.commence_time,
        home_team: homeTeamId,
        away_team: awayTeamId,
        final: true,
        home_score: Number(
            game.scores.find((s: any) => s.name === game.home_team)?.score
        ),
        away_score: Number(
            game.scores.find((s: any) => s.name === game.away_team)?.score
        ),
    };
    return await client
        .from("games")
        .upsert(upsertedGame, { onConflict: "odds_api_id" });
};

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const days = searchParams.get("days") || "1";
    const category = searchParams.get("category");
    if (!category) throw new Error("No category provided.");

    // see https://the-odds-api.com/liveapi/guides/v4/#get-scores
    const scoresResponse = await fetch(
        `https://api.the-odds-api.com/v4/sports/${category}/scores/?dateFormat=iso&daysFrom=${days}&apiKey=${process.env.ODDS_API_KEY}`
    );
    const scores = (await scoresResponse.json()).filter(
        (g: any) => g.scores !== null
    );

    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );

    const teamsResponse = await supabase.from("teams").select("*");
    const teams = teamsResponse.data;

    if (!teams) {
        throw new Error("Failed to fetch teams.");
    }

    await Promise.all(
        scores.map(async (game: any) => {
            try {
                const { data, error } = await updateScore(
                    game,
                    teams,
                    supabase
                );
                if (error) throw error;
            } catch (e: any) {
                console.error(
                    `Failed to update score for game ${game.id}: ${e.message}`
                );
            }
        })
    );

    // console.info(`Updated odds for ${odds.length} games.`);
    return NextResponse.json({ success: true });
}
