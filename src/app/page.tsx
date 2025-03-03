import Image from "next/image";
import React, { use } from "react";
import { Links, NavBar } from "./navbar";
import { TestViewer } from "./testviewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { RandomViewer } from "./randomviewer";
import Favicon from "./favicon.ico";
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

const ExampleComponent = ({ children }: { children?: React.ReactNode }) => {
    return <div>{children}</div>;
};

const testCategorys: Array<{ name: string; path: string; key: number }> = [
    { name: "xyz", path: "/random/xyz", key: 0 },
];

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
                <Link
                    href={"./random/verb"}
                    className="bg-pink-300 rounded-lg py-8 px-6 shadow"
                >
                    <div className="font-medium text-lg">Slump</div>
                    <div>Lite slumpidump</div>
                </Link>
                <div className="bg-violet-300 rounded-lg py-8 px-6 shadow">
                    <div className="font-medium text-lg">Svenska</div>
                    <div>Verbala delen</div>
                </div>
                <div className="bg-orange-300 rounded-lg py-8 px-6 shadow">
                    <div className="font-medium text-lg">Matematik</div>
                    <div>Kognetiva Delen</div>
                </div>
                <Link
                    href={"./test/verb"}
                    className="bg-cyan-300 rounded-lg py-8 px-6 shadow"
                >
                    <div className="font-medium text-lg">Delprov Verbalt</div>
                    <div>Gör ett delprov på den verbala delen SVE</div>
                </Link>
                <div className="bg-pink-300 rounded-lg py-8 px-6 shadow">
                    <div className="font-medium text-lg">Delprov Kognetiv</div>
                    <div>Gör ett delprov på den kognetiva delen XYZ</div>
                </div>
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

function Recents({ session }: { session: boolean }) {
    return <></>;
}
