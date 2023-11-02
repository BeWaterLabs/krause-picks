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
    const gamePromise = db.getGame(Number(params.id));
    const timelinePromise = db.getTimeline({ gameId: Number(params.id) });
    const userPromise = db.auth.getUser();

    const [game, timeline, user] = await Promise.all([
        gamePromise,
        timelinePromise,
        userPromise,
    ]);

    return (
        <GameDetail
            game={{
                ...game,
                timeline,
            }}
            user={user.data.user || undefined}
        />
    );
}
