import { Game, Pick, Timeline, TimelineType } from "@/types/custom.types";
import { Row } from "@/types/database-helpers.types";
import { Database } from "@/types/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

export default abstract class DatabaseClient {
    protected client: SupabaseClient<Database>;
    public auth: SupabaseClient<Database>["auth"];

    constructor(client: SupabaseClient<Database>) {
        this.client = client;
        this.auth = client.auth;
    }

    async getAccount(userId: string): Promise<Row<"accounts">> {
        const { data: account, error } = await this.client
            .from("accounts")
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) throw new Error(`Failed to find account: ${error.message}`);
        if (!account) throw new Error("Account not found");

        return account;
    }

    async getAccounts(): Promise<Row<"accounts">[]> {
        const { data: accounts, error } = await this.client
            .from("accounts")
            .select("*");

        if (error) throw new Error(`Failed to find accounts: ${error.message}`);

        return accounts;
    }

    async getCommunity(communityId: number): Promise<Row<"communities">> {
        const { data: community, error } = await this.client
            .from("communities")
            .select("*")
            .eq("id", communityId)
            .single();

        if (error)
            throw new Error(`Failed to find community: ${error.message}`);
        if (!community) throw new Error("Community not found");

        return community;
    }

    async getCommunities(): Promise<Row<"communities">[]> {
        const { data: communities, error } = await this.client
            .from("communities")
            .select("*");

        if (error)
            throw new Error(`Failed to find communities: ${error.message}`);

        return communities;
    }

    async getGame(gameId: number): Promise<Game> {
        const { data: game, error } = await this.client
            .from("games")
            .select(
                "*, home_team: teams!games_home_team_fkey(*), away_team: teams!games_away_team_fkey(*)"
            )
            .eq("id", gameId)
            .single();

        if (error) throw new Error(`Failed to find game: ${error.message}`);
        if (!game) throw new Error("Game not found");

        return game;
    }

    async getGames(
        filters: {
            excluded?: number[];
            from?: Date;
            to?: Date;
        } = {}
    ): Promise<Game[]> {
        let query = this.client
            .from("games")
            .select(
                "*, home_team: teams!games_home_team_fkey(*), away_team: teams!games_away_team_fkey(*)"
            )
            .order("start", { ascending: true });

        if (filters.excluded) {
            query = query.not("id", "in", `(${filters.excluded.join(",")})`);
        }

        if (filters.from) {
            query = query.gte("start", filters.from.toISOString());
        }

        if (filters.to) {
            query = query.lte("start", filters.to.toISOString());
        }

        const { data: games, error } = await query;

        if (error) throw new Error(`Failed to find games: ${error.message}`);

        return games;
    }

    async getPick(pickId: number): Promise<Pick> {
        const { data: pick, error } = await this.client
            .from("spread_picks")
            .select(
                "*, account: accounts!spread_picks_account_fkey(*), game: games!inner(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
            )
            .eq("id", pickId)
            .single();

        if (error) throw new Error(`Failed to find pick: ${error.message}`);
        if (!pick) throw new Error("Pick not found");

        return pick;
    }

    async getPicks(
        filters: {
            userId?: string;
            gameId?: number;
            communityId?: number;
            finalized?: boolean;
            successful?: boolean;
            from?: Date;
            to?: Date;
        } = {}
    ): Promise<Pick[]> {
        let query = this.client
            .from("spread_picks")
            .select(
                "*, account: accounts!spread_picks_account_fkey(*), game: games!inner(*, away_team: teams!games_away_team_fkey(*), home_team: teams!games_home_team_fkey(*)), selection: teams!spread_picks_selection_fkey(*)"
            );

        if (filters.userId) {
            query = query.eq("account", filters.userId);
        }

        if (filters.communityId) {
            query = query.eq("account.community", filters.communityId);
        }

        if (filters.gameId) {
            query = query.eq("game", filters.gameId);
        }

        if (filters.finalized) {
            query = filters.finalized
                ? query.not("successful", "is", null)
                : query.is("successful", null);
        }

        if (filters.successful) {
            query = query.is("successful", filters.successful);
        }

        if (filters.from) {
            query = query.gte("game.start", filters.from.toISOString());
        }

        if (filters.to) {
            query = query.lte("game.start", filters.to.toISOString());
        }

        const { data: picks, error } = await query.order("created_at", {
            ascending: false,
        });

        if (error) throw new Error(`Failed to find picks: ${error.message}`);

        return picks;
    }

    async getTimeline(
        filters: {
            userId?: string;
            gameId?: number;
            from?: Date;
            to?: Date;
        } = {}
    ): Promise<Timeline> {
        const picks = await this.getPicks(filters);

        return picks.map((pick) => ({
            type: TimelineType.Pick,
            data: pick,
        }));
    }
}
