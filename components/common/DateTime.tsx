"use client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DateTime({ isoDate }: { isoDate: string }) {
    return (
        <div className="text-xs px-2 py-1 flex-0 flex justify-between items-center text-gray-400">
            <span>{dayjs(isoDate).tz(dayjs.tz.guess()).format("MMM DD")}</span>
            <span>{dayjs(isoDate).tz(dayjs.tz.guess()).format("hh:mm A")}</span>
        </div>
    );
}
