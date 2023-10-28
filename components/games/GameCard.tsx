import dayjs from "dayjs";
import Image from "next/image";
import { Game } from "@/types/custom.types";
import Link from "next/link";

export default function GameCard({ game }: { game: Game }) {
    return (
        <Link
            href={`/games/${game.id}`}
            className="shadow flex relative justify-between h-36 group cursor-pointer overflow-hidden dark:shadow-md dark:bg-slate-800 rounded-md border-gray-200 dark:border-gray-700 border"
        >
            <div className="w-full items-center flex gap-4 p-6">
                <Image
                    src={
                        game.home_team.icon_logo_url ||
                        game.home_team.primary_logo_url
                    }
                    alt={`${game.home_team.full_name} logo`}
                    width={120}
                    className="h-16 w-auto"
                    height={120}
                />
                <div className="relative bg-gradient-to-t dark:from-slate-800 to-transparent w-full z-10 justify-center h-full text-left flex flex-col -space-y-1">
                    <div className="uppercase font-body text-sm opacity-75">
                        {game.home_team.city}
                    </div>
                    <div className="font-heading text-4xl font-bold">
                        {game.home_team.team_name}
                    </div>
                </div>
            </div>
            <div className="text-gray-600 relative uppercase whitespace-nowrap z-20 flex h-full items-center text-lg font-medium">
                <div className="group-hover:opacity-0 opacity-100 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center transition duration-200">
                    {dayjs(game.start).format("h:mm A")}
                </div>
                <div className="group-hover:opacity-100 opacity-0 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center transition duration-200">
                    View Game
                </div>
            </div>
            <div className="w-full items-center flex gap-4 p-6">
                <div className="relative bg-gradient-to-t dark:from-slate-800 to-transparent w-full z-10 justify-center h-full text-right flex flex-col -space-y-1">
                    <div className="uppercase font-body text-sm opacity-75">
                        {game.away_team.city}
                    </div>
                    <div className="font-heading text-4xl font-bold">
                        {game.away_team.team_name}
                    </div>
                </div>
                <Image
                    src={
                        game.away_team.icon_logo_url ||
                        game.away_team.primary_logo_url
                    }
                    alt={`${game.away_team.full_name} logo`}
                    width={120}
                    className="h-16 w-auto"
                    height={120}
                />
            </div>
        </Link>
    );
}
