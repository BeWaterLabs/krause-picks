import Image from "next/image";
import serverDatabaseClient from "@/util/server-database-client";

import { Score } from "@/types/custom.types";

async function fetch(): Promise<Score[]> {
    const supabase = serverDatabaseClient();
    const { data, error } = await supabase
        .from("scores")
        .select("*, account: accounts!scores_account_fkey(*)")
        .order("score", { ascending: false });

    if (error) throw new Error(error.message);

    return data as Score[];
}

export default async function Leaderboard() {
    const scores = await fetch();

    return (
        <div className="dark:bg-slate-800 flex overflow-hidden flex-col h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg">
            <div className="flex items-center flex-0 justify-start p-4">
                <h2 className="text-xl dark:text-white text-black font-semibold">
                    Daily Leaderboard
                </h2>
            </div>

            <div className="text-sm flex-1 relative text-left">
                <div className="absolute dark:scrollbar-thumb-slate-700 scrollbar-thin scrollbar-thumb-rounded-md dark:scrollbar-track-slate-800 left-0 right-0 top-0 bottom-0 overflow-y-scroll">
                    <div className="flex flex-col">
                        {scores.map((score) => (
                            <div
                                key={score.account.user_id}
                                className="border-b flex justify-between items-center dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                            >
                                <div className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="relative">
                                        <Image
                                            className="w-10 h-10 rounded-full"
                                            src={
                                                score.account
                                                    .profile_picture_url
                                            }
                                            alt={`${score.account.username} profile image`}
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">
                                            {score.account.display_name}
                                        </div>
                                        <div className="font-normal text-gray-400 flex gap-1">
                                            @{score.account.username}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-4 text-xl text-center font-semibold">
                                    {score.score}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
