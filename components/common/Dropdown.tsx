"use client";

import { Fragment, ReactNode } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

export function Dropdown<T extends ReactNode>({
    values,
    selectedValue,
    setSelectedValue,
}: {
    values: {
        icon?: ReactNode;
        activeIcon?: ReactNode;
        label: string;
        value: T;
    }[];
    selectedValue: T;
    setSelectedValue: (value: T) => void;
}) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {values.find((value) => value.value === selectedValue)
                        ?.activeIcon ||
                        values.find((value) => value.value === selectedValue)
                            ?.icon}
                    {
                        values.find((value) => value.value === selectedValue)
                            ?.label
                    }
                    <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
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
                <Menu.Items className="absolute z-30 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-slate-600 dark:bg-slate-700 dark:ring-slate-600 dark:text-white rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1">
                        {values.map((value) => (
                            <Menu.Item key={value.value?.toString()}>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            setSelectedValue(value.value)
                                        }
                                        className={`${
                                            active ? "bg-white/10" : ""
                                        } group flex gap-2 text-gray-900 dark:text-white w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        {active && value.activeIcon
                                            ? value.activeIcon
                                            : value.icon}
                                        {value.label || value.value}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
