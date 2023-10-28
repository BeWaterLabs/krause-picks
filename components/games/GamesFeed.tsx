import { Game } from "@/types/custom.types";

import GameCard from "./GameCard";
import { serverDatabaseClient } from "@/database";

async function fetch(): Promise<Game[]> {
    const db = serverDatabaseClient();
    const {
        data: { user },
    } = await db.auth.getUser();

    const picks = await db.getPicks({
        userId: user?.id,
    });
    console.log(picks);

    const games = await db.getGames({
        excluded: user ? picks.map((p) => p.game.id) : [],
        from: new Date(),
    });
    console.log(games);

    return games;
}

export default async function GamesFeed() {
    const games = await fetch();

    return (
        <>
            {games.map((game) => (
                <div className="" key={game.id}>
                    <GameCard game={game} />
                </div>
            ))}
        </>
    );
}
