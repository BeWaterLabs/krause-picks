import Image from "next/image";
import PicksFeed from "@/components/PicksFeed";
import Leaderboard from "@/components/Leaderboard";
import UserPanel from "@/components/UserPanel";
import GamesFeed from "@/components/GamesFeed";

export default function Home() {
    return (
        <main className="p-8 w-screen overflow-x-hidden h-screen">
            <div className="flex flex-col gap-4 max-w-7xl mx-auto h-full">
                <div className="flex flex-0 w-full gap-2">
                    <div className="flex items-center justify-end relative group min-w-[100px]">
                        <Image
                            src="/logo.svg"
                            width={40}
                            height={40}
                            className="w-16 h-16"
                            alt="Krause House logo"
                        />
                    </div>
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
        </main>
    );
}
