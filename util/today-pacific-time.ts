export default function todayPacificTime() {
    // Get start of the day in Pacific Time
    const startOfTodayPT = new Date();
    startOfTodayPT.setHours(0, 0, 0, 0);
    const startOfTodayUTC = new Date(
        startOfTodayPT.toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
        })
    );

    // Get end of the day in Pacific Time
    const endOfTodayPT = new Date();
    endOfTodayPT.setHours(23, 59, 59, 999);
    const endOfTodayUTC = new Date(
        endOfTodayPT.toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
        })
    );

    return { startOfTodayUTC, endOfTodayUTC };
}
