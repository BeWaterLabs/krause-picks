"use client";
import Image from "next/image";

import { CommunityLeaderboard } from "@/types/custom.types";
import { motion } from "framer-motion";

export default function CommunityList({
    communities,
}: {
    communities: CommunityLeaderboard;
}) {
    return (
        <div className="flex flex-col">
            {communities.map((community, idx) => (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.1 * idx },
                    }}
                    exit={{ opacity: 0, y: 10 }}
                    key={community.community.id}
                    className="border-b flex justify-between items-center dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                >
                    <div className="flex w-full items-center pl-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="relative bg-slate-700 w-10 h-10 rounded-full overflow-hidden">
                            {community.community.logo_url && (
                                <Image
                                    className="object-contain object-center p-1"
                                    src={community.community.logo_url}
                                    alt={`${community.community.name} logo`}
                                    fill
                                    sizes="100px"
                                />
                            )}
                        </div>
                        <div className="pl-3">
                            <div className="text-base font-semibold">
                                {community.community.name}
                            </div>
                        </div>
                    </div>
                    <div className="pr-6 py-4 font-heading text-2xl text-center font-semibold">
                        {community.score}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
