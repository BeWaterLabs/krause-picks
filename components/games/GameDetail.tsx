"use client";
import dayjs from "dayjs";
import Image from "next/image";
import { GameWithTimeline, Pick, TimelineType } from "@/types/custom.types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GameFeed from "./GameDetailFeed";
import toast from "react-hot-toast";
import { Row } from "@/types/database-helpers.types";
import { useRouter } from "next/navigation";
import classNames from "@/util/class-names";
import { User } from "@supabase/supabase-js";
import pick from "@/actions/pick";

export default function GameDetail({
    game,
    user,
}: {
    game: GameWithTimeline;
    user?: User;
}) {
    const router = useRouter();
    const [homePicks, setHomePicks] = useState<Pick[]>([]);
    const [awayPicks, setAwayPicks] = useState<Pick[]>([]);
    const [userPick, setUserPick] = useState<Pick | null>(null);

    useEffect(() => {
        setHomePicks(
            game.timeline
                .filter(
                    (item) =>
                        item.type === TimelineType.Pick &&
                        item.data.selection.id === game.home_team.id
                )
                .map((item) => item.data)
        );
        setAwayPicks(
            game.timeline
                .filter(
                    (item) =>
                        item.type === TimelineType.Pick &&
                        item.data.selection.id === game.away_team.id
                )
                .map((item) => item.data)
        );
        setUserPick(
            game.timeline
                .filter(
                    (item) =>
                        item.type === TimelineType.Pick &&
                        item.data.account.user_id === user?.id
                )
                .map((item) => item.data)[0]
        );
    }, [game]);

    const makePickWithToast = async (selection: Row<"teams">) => {
        if (!user) {
            toast.error("Login to make a pick", {
                id: "pick-error",
            });
            return;
        }
        await pick(selection, game);
        router.refresh();
    };

    return (
        <div className="shadow h-full rounded-lg dark:shadow-md dark:bg-slate-800 border-gray-200 dark:border-gray-700 border">
            <div className="h-64 flex justify-between relative w-full">
                <button
                    onClick={() => makePickWithToast(game.away_team)}
                    className="group cursor-pointer w-full"
                >
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
                        className="opacity-10 group-hover:opacity-100 group-hover:z-20 group-hover:scale-105 group-active:scale-100 group-hover:drop-shadow-lg transition duration-200 h-64 -left-4 absolute -bottom-4 w-auto"
                        height={360}
                    />
                    <div className="relative bg-gradient-to-t p-6 group-hover:opacity-0 opacity-100 dark:from-slate-800 to-transparent w-full z-10 justify-end h-full text-left flex flex-col -space-y-1">
                        <div className="uppercase font-body text-base opacity-75">
                            {game.away_team.city}
                        </div>
                        <div className="font-heading text-5xl font-bold">
                            {game.away_team.team_name}
                        </div>
                    </div>
                </button>

                <div className="text-gray-600 justify-center relative uppercase whitespace-nowrap flex h-full items-center font-heading text-xl font-semibold">
                    {dayjs(game.start).format("h:mm A")}
                </div>
                <button
                    onClick={() => makePickWithToast(game.home_team)}
                    className="group cursor-pointer w-full"
                >
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
                        className="opacity-10 group-hover:opacity-100 group-hover:z-20 group-hover:scale-105 group-active:scale-100 group-hover:drop-shadow-lg transition duration-200 h-64 -right-4 absolute -bottom-4 w-auto"
                        height={360}
                    />
                    <div className="relative bg-gradient-to-t group-hover:opacity-0 opacity-100 p-6 dark:from-slate-800 to-transparent w-full z-10 justify-end h-full text-right flex flex-col -space-y-1">
                        <div className="uppercase font-body text-base opacity-75">
                            {game.home_team.city}
                        </div>
                        <div className="font-heading text-5xl font-bold">
                            {game.home_team.team_name}
                        </div>
                    </div>
                </button>
            </div>
            <div className="flex h-12 relative z-10 bg-slate-800 text-2xl font-semibold font-heading">
                <motion.div
                    initial={{
                        width: "0%",
                    }}
                    animate={{
                        width: `${
                            (awayPicks.length /
                                (homePicks.length + awayPicks.length || 1)) *
                            100
                        }%`,
                    }}
                    style={{
                        backgroundImage: `linear-gradient(to bottom right, ${game.away_team.primary_color}, ${game.away_team.primary_color}5A)`,
                    }}
                    className="pr-2 absolute min-w-[20%] max-w-[80%] flex overflow-hidden items-center left-0 h-full px-3 justify-between"
                >
                    <div>
                        {(
                            (awayPicks.length /
                                (homePicks.length + awayPicks.length || 1)) *
                            100
                        ).toFixed(0)}
                        %
                    </div>
                    <div
                        className={classNames(
                            "text-sm",
                            userPick?.selection.id === game.away_team.id
                                ? "opacity-100"
                                : "opacity-0"
                        )}
                    >
                        Your pick
                    </div>
                </motion.div>
                <motion.div
                    initial={{
                        width: "0%",
                    }}
                    animate={{
                        width: `${
                            (homePicks.length /
                                (homePicks.length + awayPicks.length || 1)) *
                            100
                        }%`,
                    }}
                    style={{
                        backgroundImage: `linear-gradient(to bottom right, ${game.home_team.primary_color}, ${game.home_team.primary_color}5A)`,
                    }}
                    className="absolute justify-between pl-2 min-w-[20%] max-w-[80%] flex overflow-hidden items-center right-0 px-3 h-full"
                >
                    <div
                        className={classNames(
                            "text-sm",
                            userPick?.selection.id === game.home_team.id
                                ? "opacity-100"
                                : "opacity-0"
                        )}
                    >
                        Your pick
                    </div>
                    <div>
                        {(
                            (homePicks.length /
                                (homePicks.length + awayPicks.length || 1)) *
                            100
                        ).toFixed(0)}
                        %
                    </div>
                </motion.div>
            </div>
            <div className="p-6">
                <GameFeed feed={game.timeline} />
            </div>
        </div>
    );
}
