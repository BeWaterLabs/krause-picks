import Image from "next/image";
import interpretSpread from "@/util/interpret-spread";
import { Row } from "@/types/database-helpers.types";
import { Game } from "@/types/custom.types";

export default function SpreadPickCallout({
    selection,
    game,
    spread,
}: {
    selection: Row<"teams">;
    game: Game;
    spread: number;
}) {
    return (
        <div className="border p-2 dark:border-gray-700 rounded-lg flex gap-3 items-center">
            <Image
                src={selection.icon_logo_url || selection.primary_logo_url}
                alt={`${selection.full_name} logo`}
                width={125}
                height={125}
                className="w-10 h-10"
            />
            <div className="flex gap-3 justify-between items-center w-full">
                <div>
                    <h4 className="text-sm font-medium">
                        {selection.full_name}
                    </h4>
                    <h6 className="text-xs text-gray-400">
                        {interpretSpread(
                            spread,
                            game.home_team.id === selection.id
                                ? game.away_team.team_name ||
                                      game.away_team.full_name
                                : game.home_team.team_name ||
                                      game.home_team.full_name
                        )}
                    </h6>
                </div>
                <div className="bg-slate-700/50 text-gray-200 p-2 px-4 font-semibold rounded-lg">
                    {(spread > 0 ? "+" : "") + spread}
                </div>
            </div>
        </div>
    );
}
