"use client";
import { Game } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";
import Image from "next/image";
import { useState } from "react";
import PostModal from "@/components/picks/PostModal";
import { User } from "@supabase/supabase-js";

function Spread({ children }: { children: string | number }) {
    return (
        <div className="dark:bg-slate-700/50 w-full rounded-md text-xs flex group-hover:bg-transparent transition duration-200 justify-center p-1">
            {children}
        </div>
    );
}

export default function GamePickButton({
    team,
    spread,
    game,
    user,
}: {
    team: Row<"teams">;
    spread: number;
    game: Game;
    user: User | null;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="flex cursor-pointer h-full hover:dark:bg-slate-700/50 group transition duration-200 flex-col rounded-md items-center w-20 p-2 gap-2"
                onClick={() => setIsOpen(true)}
            >
                <div className="h-full flex-1 flex items-center">
                    <Image
                        src={team.icon_logo_url || team.primary_logo_url}
                        alt={`${team.full_name} logo`}
                        width={40}
                        className="group-hover:scale-110 transition duration-200 h-8 w-auto"
                        height={40}
                    />
                </div>
                <Spread>{(spread > 0 ? "+" : "") + spread}</Spread>
            </div>
            <PostModal
                game={game}
                selection={team}
                spread={spread}
                isOpen={isOpen}
                user={user}
                close={() => setIsOpen(false)}
            />
        </>
    );
}
