import { NextRequest, NextResponse } from "next/server";

import type { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import {
    AccountWithCommunity,
    CommunityLeaderboard,
    UserLeaderboard,
} from "@/types/custom.types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
    const today = new Date();
    today.setHours(3, 0, 0, 0);
    const isoToday = today.toISOString().slice(0, 19) + "Z";

    const searchParams = request.nextUrl.searchParams;
    const since = searchParams.get("since") || isoToday;

    const supabase = createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_ADMIN_KEY!
    );
    const { data: communities, error: communitiesError } = await supabase
        .from("communities")
        .select("*");

    if (communitiesError) throw new Error(communitiesError.message);

    // fetch the user leaderboard from /api/leaderboard/users
    const userLeaderboardResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leaderboard/users?since=${since}`
    );
    const { leaderboard: userLeaderboard }: { leaderboard: UserLeaderboard } =
        await userLeaderboardResponse.json();

    // Create a new Set to store unique community ids
    let communitySet = new Set<number>();

    // Iterate over the user leaderboard to populate the community set
    userLeaderboard.forEach((user) => {
        if (user.account.community?.id)
            communitySet.add(user.account.community.id);
    });

    // Initialize an empty array to store the community leaderboard
    let communityLeaderboard: CommunityLeaderboard = [];

    // Iterate over the community set
    communitySet.forEach((communityId) => {
        // Calculate the total score for each community
        const totalScore = userLeaderboard
            .filter((user) => user.account.community?.id === communityId)
            .reduce((total, user) => total + user.score, 0);

        const community = communities.find((c) => c.id === communityId);

        // Push the community and its total score to the community leaderboard
        if (community)
            communityLeaderboard.push({ community, score: totalScore });
    });

    // Sort the community leaderboard by score in descending order
    communityLeaderboard.sort((a, b) => b.score - a.score);

    return NextResponse.json({ leaderboard: communityLeaderboard });
}
