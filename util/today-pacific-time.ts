import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function todayPacificTime(offsetDays = 0) {
    const startOfTodayPT = dayjs()
        .tz("America/Los_Angeles")
        .add(offsetDays, "day")
        .startOf("day")
        .toDate();

    const endOfTodayPT = dayjs()
        .tz("America/Los_Angeles")
        .add(offsetDays, "day")
        .endOf("day")
        .toDate();

    return { startOfTodayPT, endOfTodayPT };
}
