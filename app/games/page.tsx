import { GameWithTimeline } from "@/types/custom.types";

import { serverDatabaseClient } from "@/database";
import GameCard from "@/components/games/GameCard";

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

    return (
        <>
            {games.map((game) => (
                <GameCard game={game} key={game.id} />
            ))}
        </>
    );
}
