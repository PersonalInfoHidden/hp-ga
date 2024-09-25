import Image from "next/image";
import React from "react";
import { Links, NavBar } from "./navbar";

const ExampleComponent = ({ children }: { children?: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div className="grid col-span-2">
                <ExampleComponent>
                    All our base are belong to us🐌🐌🐌🐌🐌🐌🐌
                </ExampleComponent>
            </div>
        </main>
    );
}
