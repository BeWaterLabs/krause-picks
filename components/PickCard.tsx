import { SpreadPick } from "@/types/custom.types";
import formatTimeSince from "@/util/format-time-since";
import interpretSpread from "@/util/interpret-spread";
import Image from "next/image";
import StackedAvatars from "./StackedAvatars";

export default function PickCard({
    pick,
    accounts,
}: {
    pick: SpreadPick;
    accounts: any[];
}) {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    return (
        <div className="dark:bg-slate-800 gap-3 p-5 flex overflow-hidden bg-white border border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg">
            <Image
                src={pick.account.profile_picture_url}
                alt={`${pick.account.username} profile picture`}
                width={50}
                height={50}
                className="w-12 h-12 bg-gray-100 border-2 border-white rounded-full dark:border-gray-800"
            />

            <div className="py-1 w-full flex flex-col gap-3">
                <div>
                    <div className="flex gap-1">
                        <h3 className="font-bold">
                            {pick.account.display_name}
                        </h3>
                        <h6 className="font-normal text-gray-500">
                            @<u>{pick.account.username}</u> •{" "}
                            {formatTimeSince(new Date(pick.created_at))}
                        </h6>
                    </div>
                    {pick.content ? (
                        <p className="text-gray-300 mt-2">
                            {pick.content.text}
                        </p>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="border p-2 dark:border-gray-700 rounded-lg flex gap-3 items-center">
                    <Image
                        src={
                            pick.selection.icon_logo_url ||
                            pick.selection.primary_logo_url
                        }
                        alt={`${pick.selection.full_name} logo`}
                        width={125}
                        height={125}
                        className="w-10 h-10"
                    />
                    <div className="flex gap-3 justify-between items-center w-full">
                        <div>
                            <h4 className="text-sm font-medium">
                                {pick.selection.full_name}
                            </h4>
                            <h6 className="text-xs text-gray-400">
                                {interpretSpread(
                                    pick.spread,
                                    pick.game.home_team.id === pick.selection.id
                                        ? pick.game.away_team.team_name ||
                                              pick.game.away_team.full_name
                                        : pick.game.home_team.team_name ||
                                              pick.game.home_team.full_name
                                )}
                            </h6>
                        </div>
                        <div className="bg-slate-700/50 text-gray-200 p-2 px-4 font-semibold rounded-lg">
                            {(pick.spread > 0 ? "+" : "") + pick.spread}
                        </div>
                    </div>
                </div>
                <div className="flex mt-2 gap-3 justify-between">
                    <div className="flex gap-1.5 items-center">
                        <StackedAvatars
                            avatars={accounts
                                .map((account) => account.profile_picture_url)
                                .sort(() => 0.5 - Math.random())
                                .slice(0, randomNum)}
                        />
                        <span className="font-normal text-gray-500 text-sm">
                            {randomNum} people have picked with{" "}
                            {pick.account.display_name}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Make this pick
                    </button>
                </div>
            </div>
        </div>
    );
}
