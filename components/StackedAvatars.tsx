import Image from "next/image";

export default function StackedAvatars({ avatars }: { avatars: string[] }) {
    return (
        <div className="flex items-center -space-x-4">
            {avatars.map((avatar) => (
                <Image
                    key={avatar}
                    className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                    width={40}
                    height={40}
                    src={avatar}
                    alt=""
                />
            ))}
        </div>
    );
}
