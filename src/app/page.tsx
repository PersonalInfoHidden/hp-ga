import Image from "next/image";
import React from "react";
import { Links, NavBar } from "./navbar";
import { TestViewer } from "./testviewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExampleComponent = ({ children }: { children?: React.ReactNode }) => {
    return <div>{children}</div>;
};

const testCategorys: Array<{ name: string; path: string }> = [
    { name: "XYZ", path: "/random/xyz" },
];

export default function Home() {
    return (
        <main className="flex flex-col px-12">
            <Tabs defaultValue="tests">
                <TabsList>
                    <TabsTrigger value="tests">Tests</TabsTrigger>
                    <TabsTrigger value="random">Random</TabsTrigger>
                    <TabsTrigger value="recent">Recents</TabsTrigger>
                </TabsList>
                <TabsContent value="tests">
                    <div className="grid grid-row-2 my-12">
                        <TestViewer />
                    </div>
                </TabsContent>
                <TabsContent value="random">
                    <div></div>
                </TabsContent>
            </Tabs>
        </main>
    );
}
