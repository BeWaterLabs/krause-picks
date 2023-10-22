"use client";
import Image from "next/image";
import { Row } from "@/types/database-helpers.types";
import Dropdown from "@/components/common/Dropdown";
import { useMemo, useState } from "react";
import {
    AccountWithCommunity,
    CommunityLeaderboard,
    UserLeaderboard,
} from "@/types/custom.types";
import { UserGroupIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";

enum Category {
    Users = "Users",
    Communities = "Communities",
}
const CategoryIcons = {
    Users: <UserIcon className="w-5 h-5" />,
    Communities: <UserGroupIcon className="w-5 h-5" />,
};

export default function LeaderboardContent({
    topUserScores,
    topCommunityScores,
}: {
    topUserScores: UserLeaderboard;
    topCommunityScores: CommunityLeaderboard;
}) {
    const [selectedCategory, setSelectedCategory] = useState<Category>(
        Category.Users
    );
    const categories = useMemo(() => {
        return {
            [Category.Users]: topUserScores,
            [Category.Communities]: topCommunityScores,
        };
    }, [topUserScores, topCommunityScores]);

    return (
        <div className="flex overflow-hidden flex-col h-full">
            <div className="flex items-center flex-0 justify-between p-4">
                <h2 className="text-xl dark:text-white text-black font-semibold">
                    Leaderboard
                </h2>
                <Dropdown
                    values={Object.values(Category).map((category) => ({
                        icon: CategoryIcons[category],
                        value: category,
                    }))}
                    selectedValue={selectedCategory}
                    setSelectedValue={setSelectedCategory}
                />
            </div>

            <div className="text-sm flex-1 relative text-left">
                <div className="absolute dark:scrollbar-thumb-slate-700 scrollbar-thin scrollbar-thumb-rounded-md dark:scrollbar-track-slate-800 left-0 right-0 top-0 bottom-0 overflow-y-scroll">
                    <div className="flex flex-col">
                        {topUserScores.map((userWithScore) => (
                            <div
                                key={userWithScore.account.user_id}
                                className="border-b flex justify-between items-center dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                            >
                                <div className="flex w-full items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="relative">
                                        <Image
                                            className="w-10 h-10 rounded-full"
                                            src={
                                                userWithScore.account
                                                    .profile_picture_url
                                            }
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
                </div>
            </div>
        </div>
    );
}
