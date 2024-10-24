import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import OptionsMenu from "./optionsmenu";

const avalibleTests = [
    { name: "Vår 2024", path: "test/spring24" },
    { name: "Vår 2024", path: "test/spring24" },
    { name: "Vår 2024", path: "test/spring24" },
    { name: "Vår 2024", path: "test/spring24" },
];

export const TestViewer = () => {
    return (
        <div className="bg-zinc-900  px-8 py-10 rounded-2xl border">
            <div className="font-semibold text-lg my-2">
                Välj mellan dessa Proven
            </div>
            <div className="grid grid-cols-1  justify-around">
                {avalibleTests.map((value) => (
                    <div className="grid grid-cols-4 hover:bg-secondary p-2">
                        <div className="leading-loose  pr-6 ">
                            <Link href={value.path}>{value.name}</Link>
                        </div>
                        <div className="col-span-2 flex items-center">
                            implement score here
                        </div>

                        <button className="flex justify-center items-center">
                            <OptionsMenu>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </OptionsMenu>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
