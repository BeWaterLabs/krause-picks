import moment from "moment-timezone";

export default function todayPacificTime() {
    const startOfTodayPT = moment()
        .tz("America/Los_Angeles")
        .startOf("day")
        .toDate();
    const endOfTodayPT = moment()
        .tz("America/Los_Angeles")
        .endOf("day")
        .toDate();

    console.log(startOfTodayPT, endOfTodayPT);

    return { startOfTodayPT, endOfTodayPT };
}
