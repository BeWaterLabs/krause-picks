import { Database } from "@/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default () => createClientComponentClient<Database>();
