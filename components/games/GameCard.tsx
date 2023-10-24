"use client";
import { Game } from "@/types/custom.types";
import GamePickButton from "./GamePickButton";
import browserDatabaseClient from "@/util/browser-database-client";

export default async function GameCard({ game }: { game: Game }) {
    const supabase = browserDatabaseClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="shadow h-full flex flex-col justify-between dark:shadow-md dark:bg-slate-800 rounded-md p-2 border-gray-200 dark:border-gray-700 border">
            <div className="text-xs px-2 py-1 flex-0 flex justify-between items-center text-gray-400">
                <span>
                    {new Date(game.start).toLocaleDateString(undefined, {
                        month: "short",
                        day: "2-digit",
                    })}
                </span>
                <span>
                    {new Date(game.start).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </span>
            </div>
            <div className="flex-1 flex">
                <GamePickButton
                    team={game.home_team}
                    spread={game.home_spread}
                    game={game}
                    user={user}
                />
                <GamePickButton
                    team={game.away_team}
                    spread={game.away_spread}
                    game={game}
                    user={user}
                />
            </div>
        </div>
    );
}
