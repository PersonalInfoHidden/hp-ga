import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Links, NavBar } from "./navbar";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
const links: Array<Links> = [
    {
        name: "Example 1",
        path: "/example1",
    },
    {
        name: "🐌🐌🐌🐌",
        path: "/test/spring24",
    },
    {
        name: "Colors",
        path: "/colors",
    },
];
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}
