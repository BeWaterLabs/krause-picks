export default function LoadingLeaderboardPage() {
    return (
        <>
            {[...Array(5)].map((_: unknown, i: number) => (
                <div
                    key={i}
                    className="h-48 group cursor-pointer overflow-hidden dark:shadow-md dark:bg-slate-800 rounded-md animate-pulse"
                />
            ))}
        </>
    );
}
