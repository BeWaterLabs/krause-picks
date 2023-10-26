import { Game } from "@/types/custom.types";

import GameCard from "./GameCard";
import HorizontalScroll from "../HorizontalScroll";
import { serverDatabaseClient } from "@/database";

async function fetch(): Promise<Game[]> {
    const db = serverDatabaseClient();
    const {
        data: { user },
    } = await db.auth.getUser();

    const picks = await db.getSpreadPicks({
        userId: user?.id,
    });

    const games = await db.getGames({
        excluded: picks.map((p) => p.game.id),
        from: new Date(),
    });

    return games;
}

export default async function GamesFeed() {
    const games = await fetch();

    return (
        <HorizontalScroll>
            {games.map((game) => (
                <div className="mr-2" key={game.id}>
                    <GameCard game={game} />
                </div>
            ))}
        </HorizontalScroll>
    );
}
