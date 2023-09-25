"use client";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function LeaderboardDropdown() {
    const [active, setActive] = useState("Players");
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md dark:bg-slate-800 dark:hover:bg-slate-700/50 dark:ring-gray-600 dark:text-white bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {active}
                    <ChevronDownIcon
                        className="-mr-1 h-5 w-5 text-gray-400 dark:text-gray-200"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right dark:shadow-2xl rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    onClick={() => setActive("Players")}
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900 dark:text-white dark:bg-slate-700/50"
                                            : "text-gray-700 dark:text-slate-200",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Players
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    onClick={() => setActive("Teams")}
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900 dark:text-white dark:bg-slate-700/50"
                                            : "text-gray-700 dark:text-slate-200",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Teams
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
