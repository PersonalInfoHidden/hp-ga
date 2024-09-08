"use client";

import React, { useState } from "react";
import punktpålinje from "publicimagespunktpålinje.png";
import Image from "next/image";
import { HPQuestion } from "./page";

const Question = ({ question }: { question: HPQuestion }) => {
    const [currentAnswer, setCurrentAnswer] = useState<string>(
        question.answers[0]
    );
    const [lockedAnwer, setLockedAnwer] = useState<boolean>(false);
    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-y-1 w-[calc(75%+12rem)]">
                <div className="text-center col-span-2 text-3xl md:text-8xl py-2 md:ont-semibold">
                    {question.name}
                </div>
                <div className="col-span-2 mx-3">
                    <p className="text-2xl">{question.question_text}</p>
                </div>
                <div className="col-span-2 md:col-span-1 place-content-center flex justify-center items-center border border-primary-foreground">
                    <Image
                        src={`/images/punktpålinje.png`}
                        width="0"
                        className="m-6 md:mx-8 md:my-8"
                        height="0"
                        sizes="100vw"
                        style={{
                            width: "95%",
                            height: "auto",
                            borderRadius: "2rem",
                        }}
                        alt="Picture of the author"
                        priority={false}
                    />
                </div>
                <ul className="grid list-none gap-y-2 col-span-2 md:col-span-1 px-4 md:px-0">
                    {question.answers.map((value, index) => (
                        <li key={value}>
                            <label className="block h-full border-2 border-primary-foreground py-2 rounded-lg has-[:checked]:border-primary has-[:checked]:bg-primary-foreground has-[:checked]:animate-wiggle">
                                <input
                                    defaultChecked={index == 0}
                                    type="radio"
                                    name="data-answers"
                                    className="hidden"
                                    onChange={() => {
                                        setCurrentAnswer(value);
                                    }}
                                />
                                <h1 className="h-full flex justify-center items-center text-2xl md:text-xl">
                                    {value}
                                </h1>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="col-span-2 py-2 grid place-items-center">
                    <button
                        type="submit"
                        className="uppercase text-lg bg-amber-500 py-4 font-semibold border-4 border-amber-200 mx-3 my-2 w-11/12 rounded-lg hover:bg-amber-300 hover:border-amber-500"
                        onClick={() => {
                            console.log(currentAnswer);
                        }}
                    >
                        Check
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Question;
