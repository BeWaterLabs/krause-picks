export const runtime = "edge";

import { Insert } from "@/types/database-helpers.types";
import { Database } from "@/types/database.types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { game_id, selection_id, content } = await request.json();
    if (!game_id || !selection_id)
        return NextResponse.json(
            { error: "Missing game_id or selection_id" },
            { status: 400 }
        );

    const userClient = createServerActionClient({ cookies });
    const {
        data: { user },
    } = await userClient.auth.getUser();
    if (!user)
        return NextResponse.json(
            { error: "You must be logged in to make a pick" },
            { status: 401 }
        );

    const { data: account, error: accountError } = await userClient
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();
    if (!account || accountError)
        return new NextResponse(
            `Failed to find account: ${accountError?.message}}`,
            { status: 400 }
        );

    const { data: game, error: gameError } = await userClient
        .from("games")
        .select("*")
        .eq("id", game_id)
        .single();
    if (!game || gameError)
        return NextResponse.json(
            { error: `Failed to find game: ${gameError?.message}}` },
            { status: 400 }
        );

    if (new Date() > new Date(game.start))
        return NextResponse.json(
            { error: "Game has already started" },
            { status: 400 }
        );

    const { data: existingPick, error: existingPickError } = await userClient
        .from("spread_picks")
        .select("*")
        .eq("game", game.id)
        .eq("account", account.user_id)
        .maybeSingle();

    if (existingPick || existingPickError)
        return NextResponse.json("You already have a pick for this game", {
            status: 400,
        });

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

    if (error)
        return NextResponse.json(
            { error: `Failed to insert pick: ${error.message}` },
            { status: 400 }
        );
    return NextResponse.json({ success: true, data });
}
