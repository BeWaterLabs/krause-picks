import Image from "next/image";
import { Pick } from "@/types/custom.types";

export default function FinalizedPick({ pick }: { pick: Pick }) {
    return (
        <div
            className={`flex gap-3 justify-between font-bold text-base items-center w-full ${
                pick.successful === null
                    ? "text-white"
                    : pick.successful
                    ? "text-green-500"
                    : "text-red-500"
            }`}
        >
            <div className="flex text-sm gap-3 text-gray-500 font-semibold items-center w-full">
                <Image
                    src={
                        pick.selection.icon_logo_url ||
                        pick.selection.primary_logo_url
                    }
                    alt={`${pick.selection.full_name} logo`}
                    width={125}
                    height={125}
                    className="w-auto h-7"
                />
                {pick.selection.full_name}
            </div>
            <div className="rounded-md w-16 flex justify-center py-1 text-sm bg-slate-700">
                {pick.spread > 0 ? "+" : ""}
                {pick.spread}
            </div>
        </div>
    );
}
