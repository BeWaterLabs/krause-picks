import { Row } from "./database-helpers.types";

export type Game = Row<"games"> & {
    home_team: Row<"teams">;
    away_team: Row<"teams">;
    home_spread: number;
    away_spread: number;
};

export type Score = Row<"scores"> & {
    account: Row<"accounts">;
};

export type SpreadPick = Row<"spread_picks"> & {
    account: Row<"accounts">;
    game: Game;
    selection: Row<"teams">;
    content?: {
        text?: string;
    };
};

export type AccountWithCommunity = Row<"accounts"> & {
    community: Row<"communities"> | null;
};

export type UserLeaderboard = {
    account: AccountWithCommunity;
    score: number;
}[];
export type CommunityLeaderboard = {
    community: Row<"communities">;
    score: number;
}[];

export type UserStats = {
    successfulPicks: number;
    totalPicks: number;
    pendingPicks: number;
    completedPicks: number;
    accuracy: number;
    rank?: number;
};
