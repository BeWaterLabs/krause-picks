import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import DatabaseClient from "./DatabaseClient";
import { Insert } from "@/types/database-helpers.types";

class AdminDatabaseClient extends DatabaseClient {
    constructor() {
        const client = createClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_ADMIN_KEY!
        );
        super(client);
    }

    async postLeaderboard(rows: Insert<"leaderboard">[]) {
        const { error } = await this.client
            .from("leaderboard")
            .upsert(rows, { onConflict: "user" });

        if (error)
            throw new Error(`Failed to insert leaderboard: ${error.message}`);
    }
}
export default () => new AdminDatabaseClient();
