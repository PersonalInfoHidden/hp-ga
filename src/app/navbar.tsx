import { Nav } from "@/components/nav";
import Link from "next/link";
import path from "path";
import React from "react";

export interface Links {
    name: string;
    path: string;
}

export const NavBar = ({
    children,
    links,
}: {
    children?: React.ReactNode;
    links: Array<Links>;
}) => {
    return (
        <div className="flex">
            {links.map((value, index) => (
                <Nav path={value.path} key={index}>
                    {value.name}
                </Nav>
            ))}
            {children}
        </div>
    );
};
