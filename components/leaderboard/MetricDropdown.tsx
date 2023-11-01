"use client";

import { Dropdown } from "@/components/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function MetricDropdown({ selected }: { selected?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Dropdown
            values={[
                { value: "score", label: "Score" },
                { value: "accuracy", label: "Accuracy" },
            ]}
            selectedValue={selected || "score"}
            setSelectedValue={(v) => {
                const params = new URLSearchParams(searchParams);
                params.set("show", v);
                router.push(pathname + "?" + params.toString());
            }}
        ></Dropdown>
    );
}
