"use client";

import { Dropdown } from "@/components/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PeriodDropdown({ selected }: { selected?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Dropdown
            values={[
                { value: "all-time", label: "All Time" },
                { value: "past-week", label: "Past Week" },
                { value: "yesterday", label: "Yesterday" },
            ]}
            selectedValue={selected || "all-time"}
            setSelectedValue={(v) => {
                const params = new URLSearchParams(searchParams);
                params.set("period", v);
                router.push(pathname + "?" + params.toString());
            }}
        ></Dropdown>
    );
}
