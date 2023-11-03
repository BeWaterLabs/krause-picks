import { Spinner } from "@/components/common";

export default function LoadingProfilePage() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <Spinner size={12} color="fill-gray-700" />
        </div>
    );
}
