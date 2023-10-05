export default function AuthCodeErrorPage({
    searchParams,
}: {
    searchParams: { error: string };
}) {
    return <div>Error: {searchParams.error}</div>;
}
