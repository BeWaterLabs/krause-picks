import { Spinner } from "@/components/common";

export default function LoadingGamesPage() {
    return (
        <div className="flex w-full items-center h-full justify-center">
            <Spinner size={12} color="fill-gray-700" />
        </div>
    );
}
