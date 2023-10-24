"use client";
import { AnimatePresence } from "framer-motion";
import Dropdown from "@/components/common/Dropdown";
import { useMemo, useState } from "react";
import { CommunityLeaderboard, UserLeaderboard } from "@/types/custom.types";
import { UserGroupIcon, UserIcon } from "@heroicons/react/20/solid";
import UserList from "./UserList";
import CommunityList from "./CommunityList";

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
                <h2 className="text-2xl font-heading dark:text-white text-black font-semibold">
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
                    <AnimatePresence>
                        {selectedCategory === Category.Users && (
                            <UserList users={categories[selectedCategory]} />
                        )}
                        {selectedCategory === Category.Communities && (
                            <CommunityList
                                communities={categories[selectedCategory]}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
