"use client";
import Link from "next/link";
import Image from "next/image";
import classNames from "@/util/class-names";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function Filters({
    defaultOption,
    options,
    searchParam,
}: {
    defaultOption: string | number;
    options: { image?: string; label: string; value: string | number }[];
    searchParam: string;
}) {
    const search = useSearchParams();
    const pathname = usePathname();
    const selected = useMemo(
        () => search.get(searchParam) || defaultOption,
        [searchParam, search]
    );

    return (
        <div className="w-full flex flex-row gap-2">
            {options.map((option) => (
                <Link
                    key={option.value}
                    href={
                        defaultOption === option.value
                            ? pathname
                            : `${pathname}?${searchParam}=${option.value}`
                    }
                    className={classNames(
                        "dark:bg-slate-800 flex gap-2 items-center border cursor-pointer dark:border-gray-700 transition duration-200 text-base font-heading rounded-md px-3 py-1",
                        `${option.value}` === selected
                            ? "opacity-100 shadow-md"
                            : "opacity-50 hover:opacity-75"
                    )}
                >
                    {option.image && (
                        <Image
                            src={option.image}
                            alt=""
                            width={100}
                            height={100}
                            className="w-auto h-4"
                        />
                    )}
                    {option.label}
                </Link>
            ))}
        </div>
    );
}
