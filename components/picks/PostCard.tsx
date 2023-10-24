"use client";
import { SpreadPick } from "@/types/custom.types";
import formatTimeSince from "@/util/format-time-since";
import Image from "next/image";
import StackedAvatars from "../StackedAvatars";
import PickCallout from "./SpreadPickCallout";
import { User } from "@supabase/supabase-js";
import { useMemo, useState } from "react";
import PostModal from "./PostModal";
import { motion } from "framer-motion";

export default function PostCard({
    pick,
    otherPicks,
    user,
}: {
    pick: SpreadPick;
    otherPicks: SpreadPick[];
    user: User | null;
}) {
    const [modalOpen, setModalOpen] = useState(false);

    const accountsInAgreement = useMemo(
        () =>
            otherPicks
                .filter(
                    (op) =>
                        op.selection.id === pick.selection.id &&
                        op.account.user_id !== user?.id
                )
                .map((op) => op.account),
        [otherPicks, pick.selection.id, user]
    );
    const usersPick = useMemo(
        () => otherPicks.find((op) => op.account.user_id === user?.id),
        [otherPicks, user]
    );

    return (
        <>
            <PostModal
                isOpen={modalOpen}
                close={() => setModalOpen(false)}
                user={user}
                game={pick.game}
                selection={pick.selection}
                spread={pick.spread}
            />
            <motion.div
                key={pick.id}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ ease: "easeOut", duration: 0.3, type: "tween" }}
                className="dark:bg-slate-800 gap-3 p-5 flex overflow-hidden bg-white border border-gray-200 dark:border-gray-700 shadow-md rounded-lg"
            >
                <Image
                    src={pick.account.profile_picture_url}
                    alt={`${pick.account.username} profile picture`}
                    width={50}
                    height={50}
                    className="hidden md:block w-12 h-12 bg-gray-100 border rounded-full dark:border-gray-800"
                />
                <div className="py-1 w-full flex flex-col gap-3">
                    <div>
                        <div className="flex items-center gap-3">
                            <Image
                                src={pick.account.profile_picture_url}
                                alt={`${pick.account.username} profile picture`}
                                width={50}
                                height={50}
                                className="md:hidden w-10 h-10 bg-gray-100 border rounded-full dark:border-gray-800"
                            />
                            <div className="flex gap-1">
                                <h3 className="font-bold">
                                    {pick.account.display_name}
                                </h3>
                                <h6 className="font-normal text-gray-500">
                                    @<u>{pick.account.username}</u> •{" "}
                                    {formatTimeSince(new Date(pick.created_at))}
                                </h6>
                            </div>
                        </div>
                        {pick.content ? (
                            <p className="text-gray-300 mt-2">
                                {pick.content.text}
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <PickCallout
                        selection={pick.selection}
                        game={pick.game}
                        spread={pick.spread}
                    />
                    {!usersPick ? (
                        <div className="flex mt-2 gap-3 justify-between">
                            {accountsInAgreement.length > 0 ? (
                                <div className="flex gap-1.5 items-center">
                                    <StackedAvatars
                                        avatars={accountsInAgreement.map(
                                            (a) => a.profile_picture_url
                                        )}
                                    />
                                    <span className="font-normal text-gray-500 text-sm">
                                        {accountsInAgreement.length}{" "}
                                        {accountsInAgreement.length > 1
                                            ? "people have"
                                            : "person has"}{" "}
                                        picked with {pick.account.display_name}
                                    </span>
                                </div>
                            ) : (
                                <div />
                            )}
                            {pick.account.user_id !== user?.id && (
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(true)}
                                    className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Make this pick
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-1 mt-2 font-normal text-gray-500 text-sm">
                            You picked <b>{usersPick.selection.abbreviation}</b>{" "}
                            at a spread of {usersPick.spread}
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
}
