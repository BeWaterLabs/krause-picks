export default function LoadingGamesPage() {
    return (
        <div className="flex flex-col gap-4">
            {[...Array(10)].map((_: unknown, i: number) => (
                <div
                    key={i}
                    className="h-36 group cursor-pointer overflow-hidden dark:shadow-md dark:bg-slate-800 rounded-md animate-pulse"
                />
            ))}
        </div>
    );
}
