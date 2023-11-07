"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { GameWithTimeline, TimelineType } from "@/types/custom.types";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GameCard({ game }: { game: GameWithTimeline }) {
    const picks = game.timeline
        .filter((t) => t.type === TimelineType.Pick)
        .map((t) => t.data.selection);
    const awayPickPercentage =
        (picks.filter((p) => p.id === game.away_team.id).length /
            Math.max(picks.length, 1)) *
        100;
    const homePickPercentage =
        (picks.filter((p) => p.id === game.home_team.id).length /
            Math.max(picks.length, 1)) *
        100;

    return (
        <Link
            href={`/games/${game.id}`}
            className="shadow flex gap-2 sm:gap-0 relative justify-between flex-col sm:flex-row pb-2 sm:h-36 group cursor-pointer overflow-hidden dark:shadow-md dark:bg-slate-800 rounded-md border-gray-200 dark:border-gray-700 border"
        >
            <div className="w-full items-center flex gap-2 lg:gap-4 p-3 md:p-6">
                <Image
                    src={
                        game.away_team.icon_logo_url ||
                        game.away_team.primary_logo_url
                    }
                    alt={`${game.away_team.full_name} logo`}
                    width={120}
                    className="h-auto w-10 lg:w-16"
                    height={120}
                />
                <div className="relative bg-gradient-to-t dark:from-slate-800 to-transparent w-full z-10 justify-center h-full text-left flex flex-col -space-y-1">
                    <div className="uppercase whitespace-nowrap font-body text-xs lg:text-sm opacity-75">
                        {game.away_team.city}
                    </div>
                    <div className="font-heading text-lg sm:text-2xl lg:text-4xl font-bold">
                        {game.away_team.team_name}
                    </div>
                </div>
            </div>
            <div className="text-gray-600 relative uppercase whitespace-nowrap z-20 flex h-full items-center text-sm lg:text-lg font-medium">
                <div className="group-hover:opacity-0 opacity-100 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center transition duration-200">
                    {dayjs(game.start).format("h:mm A")}
                </div>
                <div className="group-hover:opacity-100 opacity-0 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center transition duration-200">
                    View Game
                </div>
            </div>
            <div className="w-full items-center flex gap-2 lg:gap-4 p-3 md:p-6">
                <div className="relative bg-gradient-to-t dark:from-slate-800 to-transparent w-full z-10 justify-center h-full text-right flex flex-col -space-y-1">
                    <div className="uppercase font-body whitespace-nowrap text-xs lg:text-sm opacity-75">
                        {game.home_team.city}
                    </div>
                    <div className="font-heading text-lg sm:text-2xl lg:text-4xl font-bold">
                        {game.home_team.team_name}
                    </div>
                </div>
                <Image
                    src={
                        game.home_team.icon_logo_url ||
                        game.home_team.primary_logo_url
                    }
                    alt={`${game.home_team.full_name} logo`}
                    width={120}
                    className="h-auto w-10 lg:w-16"
                    height={120}
                />
            </div>
            <div className="absolute left-0 right-0 bg-slate-800 items-stretch bottom-0 flex h-2">
                <motion.div
                    initial={{
                        width: "0%",
                    }}
                    animate={{
                        width: `${awayPickPercentage}%`,
                    }}
                    style={{
                        backgroundImage: `linear-gradient(to right, ${game.away_team.primary_color}, ${game.away_team.primary_color}5A)`,
                    }}
                    className={`absolute left-0 ring-[1px] ring-gray-700 min-w-[10%] h-full max-w-[90%] bg-gradient-to-r to-blue-500 from-blue-500/25`}
                />
                <motion.div
                    initial={{
                        width: "0%",
                    }}
                    animate={{
                        width: `${homePickPercentage}%`,
                    }}
                    style={{
                        backgroundImage: `linear-gradient(to left, ${game.home_team.primary_color}, ${game.home_team.primary_color}5A)`,
                    }}
                    className={`absolute right-0 ring-[1px] ring-gray-700 h-full min-w-[10%] max-w-[90%] bg-gradient-to-l to-red-500 from-red-500/25`}
                />
            </div>
        </Link>
    );
}
