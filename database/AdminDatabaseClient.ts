import { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";
import DatabaseClient from "./DatabaseClient";

class AdminDatabaseClient extends DatabaseClient {
    constructor() {
        const client = createClient<Database>(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_ADMIN_KEY!
        );
        super(client);
    }
}
export default () => new AdminDatabaseClient();
