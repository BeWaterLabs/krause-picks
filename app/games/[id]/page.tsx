import GameDetail from "@/components/games/GameDetail";
import { serverDatabaseClient } from "@/database";

export default async function GameDetailPage({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const db = serverDatabaseClient();
    const game = await db.getGame(Number(params.id));

    return <GameDetail game={game} />;
}
