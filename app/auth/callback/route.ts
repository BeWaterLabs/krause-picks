import { Insert } from "@/types/database-helpers.types";
import { Database } from "@/types/database.types";
import {
    SupabaseClient,
    User,
    createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// TODO: Route this to different provider-specific functions
async function updateAccountToLatest(user: User, community: string | null) {
    const account: Insert<"accounts"> = {
        user_id: user.id,
        created_at: user.created_at,
        username:
            user.app_metadata.provider === "twitter"
                ? user.user_metadata?.user_name
                : user.user_metadata.name,
        display_name:
            user.app_metadata.provider === "twitter"
                ? user.user_metadata?.name
                : user.user_metadata.full_name,
        community: community ? Number(community) : undefined,
        // for twitter profile images, retrieve the original size
        profile_picture_url: user.user_metadata?.avatar_url.replace(
            "_normal",
            ""
        ),
    };

    const adminClient = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );

    const { data, error } = await adminClient
        .from("accounts")
        .upsert(account, { onConflict: "user_id" });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const community = searchParams.get("community");
    const next = searchParams.get("next") ?? "/";

    if (code) {
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient<Database>(
            {
                cookies: () => cookieStore,
            },
            {
                supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
                supabaseKey: process.env.SUPABASE_ADMIN_KEY!,
            }
        );
        const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
        );

        if (!error) {
            await updateAccountToLatest(data.user, community);
            return NextResponse.redirect(new URL(`/${next.slice(1)}`, req.url));
        } else {
            console.error(error.message);
            return NextResponse.redirect(
                new URL(
                    `/error/auth-code-error?error=${error.message}`,
                    req.url
                )
            );
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(
        new URL(`/error/auth-code-error?error=${"No code provided"}`, req.url)
    );
}
