import { Game } from "@/types/custom.types";
import serverDatabaseClient from "@/util/server-database-client";
import GameCard from "./GameCard";
import HorizontalScroll from "./HorizontalScroll";

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
