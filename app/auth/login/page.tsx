import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
            </h1>
            <LoginForm />
        </div>
    );
}
