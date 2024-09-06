"use client";
import { Nav } from "@/components/nav";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    const pathname = usePathname();
    const isBasePath = "/" === pathname;

    return (
        <>
            <div
                className={`${
                    isBasePath ? "" : "hidden"
                } md:grid grid-cols-4 py-4  `}
            >
                <Link href={"/"} className="text-2xl text-center font-semibold">
                    Home
                </Link>
                <div className="flex gap-x-4">
                    {links.map((value, index) => (
                        <Nav path={value.path} key={index}>
                            {value.name}
                        </Nav>
                    ))}
                    {children}
                </div>
            </div>
            <div className={`${isBasePath ? "block" : ""} md:hidden`}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
        </>
    );
};
