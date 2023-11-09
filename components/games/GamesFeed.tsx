"use client";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
dayjs.extend(advancedFormat);
dayjs.extend(utc);

import { GameWithTimeline } from "@/types/custom.types";
import GameCard from "./GameCard";

export default function GamesFeed({ games }: { games: GameWithTimeline[] }) {
    return (
        <div className="w-full flex flex-col gap-4">
            {games
                .sort((a, b) => dayjs(a.start).unix() - dayjs(b.start).unix())
                .reduce((acc: React.ReactNode[], game, index, arr) => {
                    const prevGame = arr[index - 1];
                    console.log(game.start);
                    if (
                        (prevGame &&
                            dayjs(prevGame.start)
                                .local()
                                .format("YYYY-MM-DD") !==
                                dayjs(game.start)
                                    .local()
                                    .format("YYYY-MM-DD")) ||
                        index === 0
                    ) {
                        acc.push(
                            <div
                                className="mt-4 text-gray-400 mx-auto font-heading text-lg font-semibold"
                                key={game.start}
                            >
                                {dayjs(game.start)
                                    .local()
                                    .format("dddd, MMMM Do")}
                            </div>
                        );
                    }
                    acc.push(<GameCard game={game} key={game.id} />);
                    return acc;
                }, [])}
        </div>
    );
}
