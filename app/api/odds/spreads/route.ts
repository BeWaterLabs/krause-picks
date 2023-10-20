import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/types/database.types";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Insert, Row } from "@/types/database-helpers.types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const updateOdds = async (
    game: any,
    teams: Row<"teams">[],
    client: SupabaseClient<Database>
) => {
    const spreads = game.bookmakers.find(
        (b: any) => b.key === process.env.BOOKMAKER_KEY
    ).markets[0].outcomes;

    const homeTeamId = teams.find((t) => t.full_name === game.home_team)?.id;
    const awayTeamId = teams.find((t) => t.full_name === game.away_team)?.id;

    if (!homeTeamId) throw new Error(`Unknown home team ${game.home_team}`);
    if (!awayTeamId) throw new Error(`Unknown away team ${game.away_team}`);

    const upsertedGame: Insert<"games"> = {
        odds_api_id: game.id,
        start: game.commence_time,
        home_team: homeTeamId,
        away_team: awayTeamId,
        home_spread: spreads.find((s: any) => s.name === game.home_team)?.point,
        away_spread: spreads.find((s: any) => s.name === game.away_team)?.point,
    };
    return await client
        .from("games")
        .upsert(upsertedGame, { onConflict: "odds_api_id" });
};

export async function GET(request: NextRequest) {
    const now = new Date();
    const isoNow = now.toISOString().slice(0, 19) + "Z";

    const searchParams = request.nextUrl.searchParams;
    const days = searchParams.get("days") || "1";
    const category = searchParams.get("category");
    if (!category) throw new Error("No category provided.");

    const endDate = new Date();
    endDate.setHours(0, 0, 0, 0); // Set time to midnight
    endDate.setDate(endDate.getDate() + Number(days)); // Add the number of days
    const endTime = endDate.toISOString().slice(0, 19) + "Z";

    const oddsResponse = await fetch(
        `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&sport=${category}&markets=spreads&oddsFormat=american&dateFormat=iso&commenceTimeFrom=${isoNow}&commenceTimeTo=${endTime}&apiKey=${process.env.ODDS_API_KEY}`
    );
    const odds = await oddsResponse.json();

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
        odds.map(async (game: any) => {
            try {
                const { data, error } = await updateOdds(game, teams, supabase);
                if (error) throw error;
            } catch (e: any) {
                console.error(
                    `Failed to update odds for game ${game.id}: ${e.message}`
                );
            }
        })
    );

    console.info(`Updated odds for ${odds.length} ${category} games.`);
    return NextResponse.json({ success: true });
}
