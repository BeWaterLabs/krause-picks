import Image from "next/image";
import { Pick } from "@/types/custom.types";
import formatTimeSince from "@/util/format-time-since";

export default function GameFeedPick({ pick }: { pick: Pick }) {
    return (
        <div className="flex gap-2 items-center">
            <div className="relative flex h-9 w-9 flex-none items-center justify-center bg-white dark:bg-slate-800">
                <Image
                    src={pick.account.profile_picture_url}
                    alt={`${pick.account.display_name}`}
                    width={25}
                    height={25}
                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-slate-700 ring-2 ring-gray-300 dark:ring-slate-700"
                />
            </div>
            <p className="flex-auto py-0.5 text-base leading-5 text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">
                    {pick.account.display_name}
                </span>{" "}
                picked the {pick.selection.team_name}
            </p>
            <time
                dateTime={pick.created_at}
                className="flex-none text-base leading-5 text-gray-500"
            >
                • {formatTimeSince(new Date(pick.created_at))}
            </time>
        </div>
    );
}
