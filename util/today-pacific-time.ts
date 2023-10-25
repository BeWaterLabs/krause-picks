import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export default function todayPacificTime() {
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const startOfTodayPT = dayjs()
        .tz("America/Los_Angeles")
        .startOf("day")
        .toDate();

    const endOfTodayPT = dayjs()
        .tz("America/Los_Angeles")
        .endOf("day")
        .toDate();

    return { startOfTodayPT, endOfTodayPT };
}
