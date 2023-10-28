import { Game } from "@/types/custom.types";

import GameCard from "./GameCard";
import HorizontalScroll from "../HorizontalScroll";
import { serverDatabaseClient } from "@/database";

async function fetch(): Promise<Game[]> {
    const db = serverDatabaseClient();
    const {
        data: { user },
    } = await db.auth.getUser();

    const picks = await db.getPicks({
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
        <div className="w-full h-full relative">
            <div className="grid absolute pb-4 left-0 scrollbar-none right-0 top-0 bottom-0 overflow-y-scroll gap-4 overflow-scroll">
                {games.map((game) => (
                    <div className="" key={game.id}>
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
        </div>
    );
}
