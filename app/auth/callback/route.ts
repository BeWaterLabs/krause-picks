import { Insert } from "@/types/database-helpers.types";
import { Database } from "@/types/database.types";
import {
    SupabaseClient,
    User,
    createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

async function updateAccountToLatest(
    client: SupabaseClient<Database>,
    user: User
) {
    const account: Insert<"accounts"> = {
        user_id: user.id,
        created_at: user.created_at,
        username: user.user_metadata?.user_name,
        display_name: user.user_metadata?.name,
        // for twitter profile images, retrieve the original size
        profile_picture_url: user.user_metadata?.avatar_url.replace(
            "_normal.png",
            ".png"
        ),
    };

    await client.from("accounts").upsert(account, { onConflict: "user_id" });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (code) {
        const supabase = createRouteHandlerClient({ cookies: () => cookies() });
        const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
        );
        if (!error) {
            await updateAccountToLatest(supabase, data.user);
            return NextResponse.redirect(new URL(`/${next.slice(1)}`, req.url));
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(new URL("/auth/auth-code-error", req.url));
}
