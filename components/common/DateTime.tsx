"use client";

export default function DateTime({ isoDate }: { isoDate: string }) {
    return (
        <div className="text-xs px-2 py-1 flex-0 flex justify-between items-center text-gray-400">
            <span>
                {new Date(isoDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "2-digit",
                })}
            </span>
            <span>
                {new Date(isoDate).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })}
            </span>
        </div>
    );
}
