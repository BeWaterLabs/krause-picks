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
