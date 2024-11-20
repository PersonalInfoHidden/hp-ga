import Image from "next/image";
import React, { use } from "react";
import { Links, NavBar } from "./navbar";
import { TestViewer } from "./testviewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { RandomViewer } from "./randomviewer";
import { redirect } from "next/navigation";

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
    if (!isLoggedIn) {
        redirect("/login")
    }
    return (
        <main className="flex flex-col px-12">
            <Tabs defaultValue="random">
                <TabsList>
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="tests">Tests</TabsTrigger>
                    <TabsTrigger value="random">Random</TabsTrigger>
                    <TabsTrigger value="recent">Recents</TabsTrigger>
                </TabsList>
                <TabsContent value="home">
                    <div>
                        <TestViewer />
                    </div>
                </TabsContent>
                <TabsContent value="tests">
                    <div className="grid grid-row-2 my-12">
                        <TestViewer />
                    </div>
                </TabsContent>
                <TabsContent value="random">
                    <RandomViewer />
                </TabsContent>
            </Tabs>
        </main>
    );
}

function Recents({ session }: { session: boolean }) {
    return <></>;
}
