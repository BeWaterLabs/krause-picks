import { Game } from "@/types/custom.types";
import serverDatabaseClient from "@/util/server-database-client";
import GameCard from "./GameCard";

async function fetch(): Promise<Game[]> {
    const supabase = serverDatabaseClient();
    const { data, error } = await supabase
        .from("games")
        .select(
            "*, home_team: teams!games_home_team_fkey(*), away_team: teams!games_away_team_fkey(*)"
        )
        .gt("start", new Date().toISOString())
        .not("home_spread", "is", null)
        .not("away_spread", "is", null)
        .order("start", { ascending: true });

    if (error) throw new Error(error.message);

    return data as Game[];
}

export default async function GamesFeedWrapper() {
    const games = await fetch();

    return (
        <div className="relative w-full h-36">
            <div className="w-16 bg-gradient-to-r from-slate-900 to-transparent absolute left-0 z-10 top-0 bottom-0" />
            <div className="absolute left-0 flex px-12 right-0 overflow-y-scroll scrollbar-none">
                {games.map((game) => (
                    <div className="mr-2" key={game.id}>
                        <GameCard game={game} />
                    </div>
                ))}
            </div>
            <div className="w-16 bg-gradient-to-r to-slate-900 from-transparent absolute right-0 z-10 top-0 bottom-0" />
        </div>
    );
}
