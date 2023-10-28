"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { Game } from "@/types/custom.types";
import { motion } from "framer-motion";

export default function GameDetail({ game }: { game: Game }) {
    return (
        <div className="shadow overflow-hidden rounded-lg dark:shadow-md dark:bg-slate-800 border-gray-200 dark:border-gray-700 border">
            <div className="h-64 flex justify-between relative w-full">
                <div className="group cursor-pointer w-full">
                    <div className="pointer-events-none absolute text-white left-0 right-0 font-heading transition duration-200 w-full text-xl z-20 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                        Pick the {game.home_team.team_name}
                    </div>
                    <Image
                        src={
                            game.home_team.icon_logo_url ||
                            game.home_team.primary_logo_url
                        }
                        alt={`${game.home_team.full_name} logo`}
                        width={360}
                        className="opacity-10 group-hover:opacity-100 group-hover:z-20 group-hover:scale-105 group-hover:drop-shadow-lg transition duration-200 h-64 -left-4 absolute -bottom-4 w-auto"
                        height={360}
                    />
                    <div className="relative bg-gradient-to-t group-hover:opacity-0 opacity-100 p-6 dark:from-slate-800 to-transparent w-full z-10 justify-end h-full text-left flex flex-col -space-y-1">
                        <div className="uppercase font-body text-base opacity-75">
                            {game.home_team.city}
                        </div>
                        <div className="font-heading text-5xl font-bold">
                            {game.home_team.team_name}
                        </div>
                    </div>
                </div>
                <div className="text-gray-600 justify-center relative uppercase whitespace-nowrap flex h-full items-center font-heading text-xl font-semibold">
                    {dayjs(game.start).format("h:mm A")}
                </div>
                <div className="group cursor-pointer w-full">
                    <div className="absolute pointer-events-none text-white left-0 right-0 font-heading transition duration-200 w-full text-xl z-20 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                        Pick the {game.away_team.team_name}
                    </div>
                    <Image
                        src={
                            game.away_team.icon_logo_url ||
                            game.away_team.primary_logo_url
                        }
                        alt={`${game.away_team.full_name} logo`}
                        width={360}
                        className="opacity-10 group-hover:opacity-100 group-hover:z-20 group-hover:scale-105 group-hover:drop-shadow-lg transition duration-200 h-64 -right-4 absolute -bottom-4 w-auto"
                        height={360}
                    />
                    <div className="relative bg-gradient-to-t p-6 group-hover:opacity-0 opacity-100 dark:from-slate-800 to-transparent w-full z-10 justify-end h-full text-right flex flex-col -space-y-1">
                        <div className="uppercase font-body text-base opacity-75">
                            {game.away_team.city}
                        </div>
                        <div className="font-heading text-5xl font-bold">
                            {game.away_team.team_name}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-12 relative z-10 bg-slate-800 text-2xl font-semibold font-heading">
                <motion.div
                    initial={{
                        width: "0%",
                    }}
                    animate={{
                        width: "50%",
                    }}
                    className="absolute flex items-center left-0 h-full px-4 bg-gradient-to-r from-blue-500/50 to-blue-500/100"
                >
                    50%
                </motion.div>
                <motion.div
                    initial={{
                        width: "0%",
                    }}
                    animate={{
                        width: "50%",
                    }}
                    className="absolute flex items-center right-0 px-4 justify-end h-full bg-gradient-to-r to-red-500/25 from-red-500/100"
                >
                    50%
                </motion.div>
            </div>
        </div>
    );
}
