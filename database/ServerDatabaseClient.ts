import { cookies } from "next/headers";

import DatabaseClient from "./DatabaseClient";
import { Database } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

class ServerDatabaseClient extends DatabaseClient {
    constructor() {
        const client = createServerComponentClient<Database>({ cookies });
        super(client);
    }
}
export default () => new ServerDatabaseClient();
