import Image from "next/image";
import { Pick } from "@/types/custom.types";
import formatTimeSince from "@/util/format-time-since";
import classNames from "@/util/class-names";

export default function GameFeedPick({
    pick,
    showDivider,
}: {
    pick: Pick;
    showDivider?: boolean;
}) {
    return (
        <div className="flex gap-x-1 relative">
            <div
                className={classNames(
                    !showDivider ? "h-6" : "-bottom-6",
                    "absolute left-0 top-0 flex w-10 justify-center"
                )}
            >
                <div className="w-0.5 bg-gray-200 dark:bg-slate-700" />
            </div>
            <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 flex-none items-center justify-center bg-white dark:bg-slate-800">
                <Image
                    src={pick.account.profile_picture_url}
                    alt={`${pick.account.display_name}`}
                    width={25}
                    height={25}
                    className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gray-100 dark:bg-slate-700 ring-2 ring-gray-300 dark:ring-slate-700"
                />
            </div>
            <div className="flex flex-col">
                <div className="flex gap-1 py-1 sm:py-2 items-center">
                    <div className="flex flex-auto items-center gap-2">
                        <p className="py-0.5 text-sm sm:text-base flex items-center flex-wrap gap-1 leading-5 text-gray-500 dark:text-gray-400">
                            <span className="font-medium text-gray-900 dark:text-white">
                                {pick.account.display_name.length > 12
                                    ? `${pick.account.display_name.substring(
                                          0,
                                          12
                                      )}...`
                                    : pick.account.display_name}
                            </span>{" "}
                            picked <span className="hidden sm:block">the</span>{" "}
                            <span className="flex items-center gap-1 ml-1">
                                <Image
                                    src={
                                        pick.selection.icon_logo_url ||
                                        pick.selection.primary_logo_url
                                    }
                                    alt={`${pick.selection.full_name} logo`}
                                    width={25}
                                    height={25}
                                    className="h-5 w-auto"
                                />
                                <span className="hidden md:block">
                                    {pick.selection.team_name}
                                </span>
                                <span className="md:hidden">
                                    {pick.selection.abbreviation}
                                </span>
                            </span>{" "}
                            at{" "}
                            <span className="font-medium">
                                {pick.spread > 0 ? "+" : ""}
                                {pick.spread}
                            </span>
                        </p>
                        <time
                            dateTime={pick.created_at}
                            className="text-base leading-5 hidden sm:block text-gray-500"
                        >
                            • {formatTimeSince(new Date(pick.created_at))}
                        </time>
                    </div>
                </div>
                <div className="text-sm dark:text-gray-200">
                    {/* {pick.content?.text} */}
                </div>
            </div>
        </div>
    );
}
