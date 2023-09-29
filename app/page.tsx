import PicksFeed from "@/components/picks/PostsFeed";
import Leaderboard from "@/components/Leaderboard";
import UserPanel from "@/components/UserPanel";
import GamesFeed from "@/components/games/GamesFeed";

export default function Home() {
    return (
        <div className="flex flex-col h-full gap-4 max-w-7xl mx-auto">
            <div className="flex flex-0 w-full gap-2">
                <GamesFeed />
            </div>
            <div className="grid flex-1 grid-cols-8 gap-4">
                <div className="col-span-2">
                    <UserPanel />
                </div>
                <div className="col-span-4">
                    <PicksFeed />
                </div>
                <div className="col-span-2">
                    <Leaderboard />
                </div>
            </div>
        </div>
    );
}
