import Image from "next/image";

import { UserLeaderboard } from "@/types/custom.types";

export default function UserList({ users }: { users: UserLeaderboard }) {
    return (
        <div className="flex flex-col">
            {users.map((userWithScore) => (
                <div
                    key={userWithScore.account.user_id}
                    className="border-b flex justify-between items-center dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                >
                    <div className="flex w-full items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="relative">
                            <Image
                                className="w-10 h-10 rounded-full"
                                src={userWithScore.account.profile_picture_url}
                                alt={`${userWithScore.account.username} profile image`}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className="pl-3">
                            <div className="text-base font-semibold">
                                {userWithScore.account.display_name}
                            </div>
                            <div className="font-normal text-gray-400 flex gap-1">
                                @{userWithScore.account.username}
                            </div>
                        </div>
                    </div>
                    <div className="pr-6 py-4 text-xl text-center font-semibold">
                        {userWithScore.score}
                    </div>
                </div>
            ))}
        </div>
    );
}
