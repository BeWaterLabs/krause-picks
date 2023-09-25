import { Database } from "./database.types";

export type Row<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Row"];
export type Table = Database["public"]["Tables"];
