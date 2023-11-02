import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

import { serverDatabaseClient } from "@/database";
import { GameWithTimeline } from "@/types/custom.types";
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
        <div className="w-full flex flex-col gap-4">
            {games
                .sort(
                    (a, b) =>
                        new Date(a.start).getTime() -
                        new Date(b.start).getTime()
                )
                .reduce((acc: React.ReactNode[], game, index, arr) => {
                    const prevGame = arr[index - 1];
                    if (
                        (prevGame &&
                            new Date(prevGame.start).toDateString() !==
                                new Date(game.start).toDateString()) ||
                        index === 0
                    ) {
                        acc.push(
                            <div
                                className="mt-4 text-gray-400 mx-auto font-heading text-lg font-semibold"
                                key={game.start}
                            >
                                {dayjs(game.start).format("dddd, MMMM Do")}
                            </div>
                        );
                    }
                    acc.push(<GameCard game={game} key={game.id} />);
                    return acc;
                }, [])}
        </div>
    );
}
