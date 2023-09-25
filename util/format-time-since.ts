export default function formatTimeSince(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = diffMs / 1000;
    const diffMin = diffSec / 60;
    const diffHour = diffMin / 60;
    const diffDay = diffHour / 24;

    if (diffMin < 60) {
        return `${Math.floor(diffMin)}m`;
    } else if (diffHour < 24) {
        return `${Math.floor(diffHour)}h`;
    } else if (diffDay < 7) {
        return `${Math.floor(diffDay)}d`;
    } else {
        return date.toLocaleDateString(undefined, {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
        });
    }
}
