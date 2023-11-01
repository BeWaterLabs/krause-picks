import DatabaseClient from "./DatabaseClient";
import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

class BrowserDatabaseClient extends DatabaseClient {
    constructor() {
        const client = createClientComponentClient<Database>();
        super(client);
    }
}
export default () => new BrowserDatabaseClient();
