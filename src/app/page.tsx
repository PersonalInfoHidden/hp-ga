import Image from "next/image";
import React from "react";
import { Links, NavBar } from "./navbar";
import { TestViewer } from "./testviewer";

const ExampleComponent = ({ children }: { children?: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between px-12">
            <div className="grid grid-row-2 my-12">
                <TestViewer />
                <div>Få frågor slumpmässigt</div>
            </div>
        </main>
    );
}
