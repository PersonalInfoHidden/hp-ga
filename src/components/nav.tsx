"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Nav = ({
    children,
    path,
}: {
    children?: React.ReactNode;
    path: string;
}) => {
    const pathname = usePathname();
    const isCurrentPath = path === pathname;

    return (
        <nav>
            <Link
                href={path}
                className={`font-semibold text-sm ${
                    isCurrentPath ? " text-primary" : " text-muted-foreground"
                }`}
            >
                {children}
            </Link>
        </nav>
    );
};
