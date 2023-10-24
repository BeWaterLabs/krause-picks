"use client";
import { Game } from "@/types/custom.types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import SpreadPickCallout from "./SpreadPickCallout";
import { Row } from "@/types/database-helpers.types";
import toast from "react-hot-toast";
import Spinner from "@/components/common/Spinner";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function PostModal({
    game,
    spread,
    selection,
    user,
    isOpen,
    close,
}: {
    game: Game;
    spread: number;
    user: User | null;
    selection: Row<"teams">;
    isOpen: boolean;
    close: () => void;
}) {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const postPick = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/pick/spreads", {
                method: "POST",
                body: JSON.stringify({
                    game_id: game.id,
                    selection_id: selection.id,
                    content: content?.length
                        ? {
                              text: content,
                          }
                        : undefined,
                }),
            });
            const data = await res.json();

            if (!data.success) toast.error("Failed to post pick.");
            else toast.success("Pick successfully posted!");
            router.refresh();
        } catch (e) {
            toast.error("Failed to post pick.");
        }
        setLoading(false);
        close();
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-2 lg:p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="flex flex-col gap-4 w-full max-w-lg transform overflow-hidden rounded-lg border dark:border-gray-700 bg-white dark:bg-slate-800 p-4 lg:p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex justify-between items-center">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-heading font-semibold leading-6 text-gray-900 dark:text-white"
                                        >
                                            Make a pick
                                        </Dialog.Title>
                                    </div>

                                    <textarea
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        id="message"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Talk some shit..."
                                    />

                                    <SpreadPickCallout
                                        selection={selection}
                                        game={game}
                                        spread={spread}
                                    />

                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() =>
                                            user
                                                ? postPick()
                                                : toast(
                                                      "Login to make this pick",
                                                      {
                                                          id: "login-to-make-pick",
                                                      }
                                                  )
                                        }
                                        className={`p-3 flex items-center justify-center gap-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                            loading
                                                ? "opacity-50 cursor-default"
                                                : ""
                                        }`}
                                    >
                                        {loading && <Spinner />}
                                        {loading ? "Posting..." : "Submit"}
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
