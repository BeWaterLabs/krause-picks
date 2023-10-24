"use client";
import moment from "moment-timezone";

export default function DateTime({ isoDate }: { isoDate: string }) {
    return (
        <div className="text-xs px-2 py-1 flex-0 flex justify-between items-center text-gray-400">
            <span>
                {moment(isoDate).tz(moment.tz.guess()).format("MMM DD")}
            </span>
            <span>
                {moment(isoDate).tz(moment.tz.guess()).format("hh:mm A")}
            </span>
        </div>
    );
}
