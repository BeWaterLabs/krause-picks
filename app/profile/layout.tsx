export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="h-full pb-4">{children}</div>;
}
