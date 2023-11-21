"use client";
import dayjs from "dayjs";
import FinalizedPick from "./picks/FinalizedPick";
import QuickPick from "./picks/QuickPick";
import { Game, Pick } from "@/types/custom.types";

export default function UserPanelPicks({
    picks,
    games,
}: {
    picks: Pick[];
    games: Game[];
}) {
    return (
        <div className="absolute top-0 flex flex-col min-h-full right-0 left-0">
            <h3 className="text-xl flex justify-between items-center mt-6 font-heading dark:text-white text-black font-semibold">
                Quick Picks
                <p className="text-sm mt-2 font-body dark:text-gray-400 text-gray-600">
                    {
                        picks.filter((p) =>
                            games.some((g) => g.id === p.game.id)
                        ).length
                    }{" "}
                    / {games.length} picks made
                </p>
            </h3>
            <div className="flex flex-col gap-4 mt-3">
                {games.map((game) => {
                    const pick = picks.find((pick) => pick.game.id === game.id);

                    return (
                        <QuickPick
                            key={game.id}
                            game={game}
                            selection={pick?.selection}
                        />
                    );
                })}
            </div>
            {picks.filter(
                (p) =>
                    p.successful === null && new Date(p.game.start) > new Date()
            ).length > 0 && (
                <>
                    <h3 className="text-xl mt-8 font-heading dark:text-white text-black font-semibold">
                        Pending Picks
                    </h3>
                    <div className="flex flex-col gap-4 mt-3">
                        {picks
                            .filter(
                                (p) =>
                                    p.successful === null &&
                                    new Date(p.game.start) < new Date()
                            )
                            .map((pick) => (
                                <FinalizedPick key={pick.id} pick={pick} />
                            ))}
                    </div>
                </>
            )}
            <h3 className="text-xl mt-8 font-heading dark:text-white text-black font-semibold">
                Past Picks
            </h3>
            <div className="flex flex-col gap-4">
                {Object.entries(
                    picks
                        .filter((p) => p.successful !== null)
                        .reduce((acc: { [date: string]: Pick[] }, pick) => {
                            const date = dayjs(pick.game.start).format(
                                "YYYY-MM-DD"
                            );
                            if (!acc[date]) {
                                acc[date] = [];
                            }
                            acc[date].push(pick);
                            return acc;
                        }, {})
                ).map(([date, picks]) => (
                    <div key={date}>
                        <h4 className="text-lg mt-2 font-heading dark:text-gray-500 text-black font-semibold">
                            {dayjs(date).format("MMMM D, YYYY")}
                        </h4>
                        <div className="flex flex-col gap-4 mt-3">
                            {picks.map((pick) => (
                                <FinalizedPick key={pick.id} pick={pick} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
