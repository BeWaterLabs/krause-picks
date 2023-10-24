import { Game } from "@/types/custom.types";
import GamePickButton from "./GamePickButton";
import serverDatabaseClient from "@/util/server-database-client";
import DateTime from "../common/DateTime";

export default async function GameCard({ game }: { game: Game }) {
    const supabase = serverDatabaseClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="shadow h-full flex flex-col justify-between dark:shadow-md dark:bg-slate-800 rounded-md p-2 border-gray-200 dark:border-gray-700 border">
            <DateTime isoDate={game.start} />
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
