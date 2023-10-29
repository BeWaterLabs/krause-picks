import { Timeline } from "@/types/custom.types";
import GameFeedPick from "./GameFeedPick";

export default function GameFeed({
    feed,
    isLoading,
}: {
    feed: Timeline;
    isLoading?: boolean;
}) {
    return (
        <div>
            <ul role="list" className="space-y-4">
                {feed.map((feedItem, feedItemIdx) => (
                    <li key={feedItemIdx}>
                        <GameFeedPick
                            pick={feedItem.data}
                            showDivider={feedItemIdx < feed.length - 1}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
