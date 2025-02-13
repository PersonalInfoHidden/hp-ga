import Image from "next/image";
import React, { use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import Favicon from "./../../favicon.ico";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const tests = ["2024", "2023"];

export default async function Home() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const isLoggedIn = user !== null;

    const introText = "Hejsan, Isak Wext";
    return (
        <main className="flex flex-col pt-10 gr mx-4">
            <div className="flex justify-between text-2xl font-normal mt-6 mb-4">
                <Image
                    src={Favicon}
                    alt="Profile Picture"
                    height={50}
                    width={50}
                    className="rounded"
                ></Image>
                <div className="w-full px-6 flex items-center ">
                    {introText}
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <FontAwesomeIcon icon={faTree} className="size-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="mb-4">
                <span>Vad vill du pluga på nu?</span>
            </div>
            <div className="py-10 grid grid-flow-row gap-y-8  ">
                {tests.map((value) => (
                    <div
                        className="bg-cyan-300 rounded-lg py-8 px-6 shadow"
                        key={value}
                    >
                        <div className="font-medium text-lg">{value}</div>
                    </div>
                ))}
            </div>
            <div className="">
                <div className="bg-white shadow-lg flex justify-between px-8">
                    <Link className="p-8" href={"./"}>
                        <span>Hem</span>
                    </Link>
                    <span className="p-8">Resultat</span>
                    <span className="p-8">Hjälp</span>
                </div>
            </div>
        </main>
    );
}
