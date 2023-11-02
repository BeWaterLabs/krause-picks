"use client";

import Link from "next/link";

interface ButtonProps {
    loading?: boolean;
    onClick?: () => void;
    href?: string;
    className?: string;
    children: React.ReactNode;
}

export function Button({
    loading,
    onClick,
    href,
    className,
    children,
}: ButtonProps) {
    const style = `transition duration-200 ${
        loading ? "opacity-50 cursor-default" : ""
    } ${className}`;

    if (href) {
        return (
            <Link href={href} className={style}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} disabled={loading} className={style}>
            Logout
        </button>
    );
}

export function IconButton(
    props: ButtonProps & {
        tooltip?: string;
    }
) {
    return (
        <Button
            className={`p-1 dark:text-slate-400 dark:hover:scale-110 dark:hover:text-white`}
            {...props}
        >
            {props.children}
        </Button>
    );
}
