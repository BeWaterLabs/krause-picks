import Link from "next/link";

export default async function Watch({
    searchParams,
}: {
    searchParams: { community: string; show: string; period: string };
}) {
    return (
        <div className="relative w-full h-full dark:border-gray-700 bg-slate-800 border rounded-lg shadow-md overflow-hidden">
            <div className="shadow-md border dark:border-slate-700 w-full text-sm from-blue-900 bg-gradient-to-br to-blue-700 py-1 font-medium text-center font-heading absolute top-0 right-0 left-0">
                To login to playback, go to{" "}
                <Link className="underline" href="https://www.playback.tv">
                    https://www.playback.tv
                </Link>
                .
            </div>
            <iframe
                src="https://www.playback.tv/b2b"
                className="w-full h-full"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
        </div>
    );
}
