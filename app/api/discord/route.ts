export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import adminDatabaseClient from "@/database/AdminDatabaseClient";

const CHANNEL_IDS = [
    "847583837991207005",
    "849005289670967356",
    "847583837991207005",
];

export async function GET() {
    const db = adminDatabaseClient();
    const currentLeaderboard = await db.getLeaderboardWithUsers();
    const current = currentLeaderboard.data!;

    let wasTie = false;
    // if there's a tie, add to the existing scores
    if (
        current != null &&
        current.length > 0 &&
        current[0].score === current[1].score
    ) {
        wasTie = true;
    }

    const topTen = current
        .slice(0, 10)
        .map(
            (u, idx) =>
                `${idx + 1}. ${u.account?.display_name}${
                    u.account?.community?.name
                        ? ` (${u.account?.community?.name})`
                        : ""
                } | ${u.score} points`
        )
        .join("\n");

    const announcement = wasTie
        ? "**We had a tie last night! Another $25 added to the pool today!**"
        : `**${current[0].account?.display_name} takes the win!**`;

    await Promise.all(
        CHANNEL_IDS.map(async (id) => {
            await fetch(`https://discord.com/api/channels/${id}/messages`, {
                method: "POST",
                headers: {
                    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: `${announcement}\n${topTen}\n\nMake your picks 👉 https://krausepicks.com\nWatch the games with B2B on Playback 👉 https://www.playback.tv/b2b/`,
                }),
            });
        })
    );

    return NextResponse.json({ success: true });
}
