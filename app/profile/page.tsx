import UserPanel from "@/components/UserPanel";
import { serverDatabaseClient } from "@/database";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const db = serverDatabaseClient();
    const {
        data: { user },
        error,
    } = await db.auth.getUser();
    if (!user) redirect("/");

    return <UserPanel user={user} />;
}
