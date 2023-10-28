export const runtime = "edge";

import { Insert } from "@/types/database-helpers.types";
import { Database } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { game_id, selection_id, content } = await request.json();
    if (!game_id || !selection_id) {
        throw new Error("Missing game_id or selection_id");
    }

    const userClient = createServerActionClient({ cookies });
    const {
        data: { user },
    } = await userClient.auth.getUser();
    if (!user) throw new Error("You must be logged in to make a pick");

    const { data: account, error: accountError } = await userClient
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();
    if (!account || accountError)
        throw new Error(`Failed to find account: ${accountError?.message}}`);

    const { data: game, error: gameError } = await userClient
        .from("games")
        .select("*")
        .eq("id", game_id)
        .single();
    if (!game || gameError)
        throw new Error(`Failed to find game: ${gameError?.message}}`);

    if (new Date() > new Date(game.start))
        return new NextResponse("Game has already started", { status: 400 });

    const { data: existingPick, error: existingPickError } = await userClient
        .from("spread_picks")
        .select("*")
        .eq("game", game.id)
        .eq("account", account.user_id)
        .maybeSingle();

    if (existingPick || existingPickError)
        throw new Error(
            `You already have a pick for this game: ${existingPickError?.message}}`
        );

    const adminClient = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );

    const newPick: Insert<"spread_picks"> = {
        account: account.user_id,
        game: game.id,
        selection: selection_id,
        content,
        spread:
            game.home_team === selection_id
                ? game.home_spread
                : game.away_spread,
    };

    const { data, error } = await adminClient
        .from("spread_picks")
        .insert([newPick])
        .select()
        .single();

    if (error) throw new Error(`Failed to insert pick: ${error.message}`);
    return NextResponse.json({ success: true, data });
}
