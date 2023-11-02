"use client";

export default function GameDetailPageError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return <div>{error.message}</div>;
}
