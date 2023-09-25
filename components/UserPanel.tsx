import Image from "next/image";
import serverDatabaseClient from "@/util/server-database-client";

import { Row } from "@/types/database-helpers.types";

async function fetch(): Promise<Row<"teams">[]> {
    const supabase = serverDatabaseClient();
    const { data, error } = await supabase.from("teams").select("*");

    if (error) throw new Error(error.message);

    return data;
}

export default async function UserPanel() {
    const teams = await fetch();
    return (
        <div className="dark:bg-slate-800 p-6 flex overflow-hidden flex-col h-full bg-white border border-gray-200 dark:border-gray-700 shadow-md sm:rounded-lg">
            <div className="w-full flex items-center justify-center">
                <Image
                    width={125}
                    height={125}
                    src="https://pbs.twimg.com/profile_images/1646330655784017921/xBrfH2y2_400x400.jpg"
                    alt=""
                    className="rounded-full"
                />
            </div>
            <div className="grid grid-cols-3 py-8">
                <div>
                    <h3 className="text-center font-bold">42</h3>
                    <h6 className="text-center text-gray-500">Followers</h6>
                </div>
                <div>
                    <h3 className="text-center font-bold">23rd</h3>
                    <h6 className="text-center text-gray-500">Rank</h6>
                </div>
                <div>
                    <h3 className="text-center font-bold">54%</h3>
                    <h6 className="text-center text-gray-500">Accuracy</h6>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-lg dark:text-white text-black font-semibold">
                    Today's Picks
                </h3>
                <div className="flex flex-col gap-4 mt-3">
                    <div className="flex gap-3 justify-between text-base items-center w-full">
                        <div className="flex gap-3 text-gray-500 font-semibold items-center w-full">
                            <Image
                                src={
                                    teams[0].icon_logo_url ||
                                    teams[0].primary_logo_url
                                }
                                alt={`${teams[0].full_name} logo`}
                                width={125}
                                height={125}
                                className="w-auto h-7"
                            />
                            {teams[0].full_name}
                        </div>
                        <div className="rounded-md w-16 flex justify-center py-1 text-sm bg-slate-700">
                            +1
                        </div>
                    </div>
                    <div className="flex gap-3 justify-between text-base items-center w-full">
                        <div className="flex gap-3 text-gray-500 font-semibold items-center w-full">
                            <Image
                                src={
                                    teams[1].icon_logo_url ||
                                    teams[1].primary_logo_url
                                }
                                alt={`${teams[1].full_name} logo`}
                                width={125}
                                height={125}
                                className="w-auto h-7"
                            />
                            {teams[1].full_name}
                        </div>
                        <div className="rounded-md w-16 flex justify-center py-1 text-sm bg-slate-700">
                            -5
                        </div>
                    </div>
                    <div className="flex gap-3 justify-between text-base items-center w-full">
                        <div className="flex gap-3 text-gray-500 font-semibold items-center w-full">
                            <Image
                                src={
                                    teams[5].icon_logo_url ||
                                    teams[5].primary_logo_url
                                }
                                alt={`${teams[5].full_name} logo`}
                                width={125}
                                height={125}
                                className="w-auto h-7"
                            />
                            {teams[5].full_name}
                        </div>
                        <div className="rounded-md w-16 flex justify-center py-1 text-sm bg-slate-700">
                            -1.5
                        </div>
                    </div>
                    <div className="flex gap-3 justify-between text-base items-center w-full">
                        <div className="flex gap-3 text-gray-500 font-semibold items-center w-full">
                            <Image
                                src={
                                    teams[8].icon_logo_url ||
                                    teams[8].primary_logo_url
                                }
                                alt={`${teams[8].full_name} logo`}
                                width={125}
                                height={125}
                                className="w-auto h-7"
                            />
                            {teams[8].full_name}
                        </div>
                        <div className="rounded-md w-16 flex justify-center py-1 text-sm bg-slate-700">
                            -7.5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
