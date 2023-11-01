"use client";
import Image from "next/image";
import classNames from "@/util/class-names";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function Filters({
    defaultOption,
    options,
    searchParam,
}: {
    defaultOption: string;
    options: { image?: string; label: string; value: string }[];
    searchParam: string;
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const selected = useMemo(
        () => searchParams.get(searchParam) || defaultOption,
        [searchParam, searchParams]
    );

    return (
        <div className="">
            <div className="flex flex-row gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => {
                            const params = new URLSearchParams(searchParams);
                            if (option.value === defaultOption)
                                params.delete(searchParam);
                            else params.set(searchParam, option.value);
                            router.push(pathname + "?" + params.toString());
                        }}
                        className={classNames(
                            "dark:bg-slate-800 flex gap-2 min-w-[150px] justify-center whitespace-nowrap items-center border cursor-pointer dark:border-gray-700 transition duration-200 text-base font-heading rounded-md px-3 py-1",
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
                    </button>
                ))}
            </div>
        </div>
    );
}
