export default function LoadingLeaderboardPage() {
    return (
        <div className="flex flex-col h-full gap-4 max-w-7xl mx-auto">
            <div className={`flex items-stretch flex-1 gap-4`}>
                <div className="flex-[2] relative">
                    <div className="absolute pb-4 left-0 scrollbar-none right-0 top-0 bottom-0 overflow-y-scroll overflow-scroll">
                        <div className="flex flex-col gap-4">
                            {[...Array(5)].map((_: unknown, i: number) => (
                                <div
                                    key={i}
                                    className="h-36 group cursor-pointer overflow-hidden dark:shadow-md dark:bg-slate-800 rounded-md animate-pulse"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
