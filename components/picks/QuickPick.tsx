"use client";
import Image from "next/image";
import { Game } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";
import pick from "@/actions/pick";
import { useRouter } from "next/navigation";
import classNames from "@/util/class-names";

export default function QuickPick({
    game,
    selection,
}: {
    game: Game;
    selection?: Row<"teams">;
}) {
    console.log(selection);
    const router = useRouter();
    const makePickWithToast = async (selection: Row<"teams">) => {
        await pick(selection, game);
        router.refresh();
    };

    return (
        <div
            className={`flex gap-2 justify-between font-bold text-base items-center w-full`}
        >
            <div
                onClick={() => makePickWithToast(game.away_team)}
                style={{
                    backgroundImage:
                        selection?.id === game.away_team.id
                            ? `linear-gradient(to bottom right, ${game.away_team.primary_color}, ${game.away_team.primary_color}5A)`
                            : "",
                }}
                className={classNames(
                    `active:scale-95 flex text-sm border p-1 rounded-md border-gray-700 hover:border-gray-300 transition duration-200 cursor-pointer gap-3 font-semibold items-center w-full`,
                    selection?.id === game.away_team.id ? `bg-slate-700` : ""
                )}
            >
                <div
                    className={classNames(
                        "flex text-sm gap-3 font-semibold items-center w-full",
                        selection?.id === game.away_team.id
                            ? `text-white`
                            : "text-gray-500"
                    )}
                >
                    <Image
                        src={
                            game.away_team.icon_logo_url ||
                            game.away_team.primary_logo_url
                        }
                        alt={`${game.away_team.full_name} logo`}
                        width={125}
                        height={125}
                        className="w-auto h-7"
                    />
                    {game.away_team.abbreviation}
                </div>
                <div className="rounded-md w-16 flex justify-center py-1 text-sm text-white bg-slate-700">
                    {game.away_spread > 0 ? "+" : ""}
                    {game.away_spread}
                </div>
            </div>
            <div
                onClick={() => makePickWithToast(game.home_team)}
                style={{
                    backgroundImage:
                        selection?.id === game.home_team.id
                            ? `linear-gradient(to bottom right, ${game.home_team.primary_color}, ${game.home_team.primary_color}5A)`
                            : "",
                }}
                className={classNames(
                    `active:scale-95 flex text-sm border p-1 rounded-md border-gray-700 hover:border-gray-300 transition duration-200 cursor-pointer gap-3 font-semibold items-center w-full`,
                    selection?.id === game.home_team.id ? `bg-slate-700` : ""
                )}
            >
                <div
                    className={classNames(
                        "flex text-sm gap-3 font-semibold items-center w-full",
                        selection?.id === game.home_team.id
                            ? `text-white`
                            : "text-gray-500"
                    )}
                >
                    <Image
                        src={
                            game.home_team.icon_logo_url ||
                            game.home_team.primary_logo_url
                        }
                        alt={`${game.home_team.full_name} logo`}
                        width={125}
                        height={125}
                        className="w-auto h-7"
                    />
                    {game.home_team.abbreviation}
                </div>
                <div className="rounded-md w-16 flex justify-center py-1 text-sm text-white bg-slate-700">
                    {game.home_spread > 0 ? "+" : ""}
                    {game.home_spread}
                </div>
            </div>
        </div>
    );
}
