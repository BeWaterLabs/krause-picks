import { serverDatabaseClient } from "@/database";
import { GameWithTimeline } from "@/types/custom.types";
import GamesFeed from "@/components/games/GamesFeed";

async function fetch(): Promise<GameWithTimeline[]> {
    const db = serverDatabaseClient();

    const games = await db.getGames({
        from: new Date(),
    });

    return await Promise.all(
        games.map(async (game) => {
            const timeline = await db.getTimeline({
                gameId: game.id,
            });

            return {
                ...game,
                timeline,
            };
        })
    );
}

export default async function GamesPage() {
    const games = await fetch();

    return <GamesFeed games={games} />;
}
