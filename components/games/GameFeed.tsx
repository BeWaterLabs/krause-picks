"use client";

import { browserDatabaseClient } from "@/database";
import { Timeline } from "@/types/custom.types";
import classNames from "@/util/class-names";
import { Listbox } from "@headlessui/react";
import {
    CheckCircleIcon,
    PaperClipIcon,
    FaceSmileIcon,
} from "@heroicons/react/20/solid";
import { Transition } from "framer-motion";

import { Fragment, useEffect, useState } from "react";
import GameFeedPick from "./GameFeedPick";

export default function GameFeed({
    feed,
    isLoading,
}: {
    feed: Timeline;
    isLoading: boolean;
}) {
    return (
        <div>
            <ul role="list" className="space-y-6">
                {feed.map((feedItem, feedItemIdx) => (
                    <li key={feedItemIdx} className="relative flex gap-x-4">
                        <div
                            className={classNames(
                                feedItemIdx === feed.length - 1
                                    ? "h-6"
                                    : "-bottom-6",
                                "absolute left-0 top-0 flex w-6 justify-center"
                            )}
                        >
                            <div className="w-px bg-gray-200 dark:bg-slate-700" />
                        </div>
                        <GameFeedPick pick={feedItem.data} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
