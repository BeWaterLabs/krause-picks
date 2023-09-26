"use client";
import { Game } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";
import Image from "next/image";

function Spread({ children }: { children: string | number }) {
    return (
        <div className="dark:bg-slate-700/50 w-full rounded-md text-xs flex group-hover:bg-transparent transition duration-200 justify-center p-1">
            {children}
        </div>
    );
}

function Side({ team, spread }: { team: Row<"teams">; spread: number }) {
    return (
        <div className="flex cursor-pointer h-full hover:dark:bg-slate-700/50 group transition duration-200 flex-col rounded-md items-center w-20 p-2 gap-2">
            <div className="h-full flex-1 flex items-center">
                <Image
                    src={team.icon_logo_url || team.primary_logo_url}
                    alt={`${team.full_name} logo`}
                    width={40}
                    className="group-hover:scale-110 transition duration-200 h-8 w-auto"
                    height={40}
                />
            </div>
            <Spread>{(spread > 0 ? "+" : "") + spread}</Spread>
        </div>
    );
}

export default function GameCard({ game }: { game: Game }) {
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
                <Side team={game.home_team} spread={game.home_spread} />
                <Side team={game.away_team} spread={game.away_spread} />
            </div>
        </div>
    );
}
