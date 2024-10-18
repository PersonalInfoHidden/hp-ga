"use client";

import React, { useEffect, useState } from "react";
import punktpålinje from "publicimagespunktpålinje.png";
import Image from "next/image";
import submitAnswer from "../app/example1/submit";

export interface HPQuestion {
    id: number;
    type: string;
    question_text: string;
    image_path?: string;
    correct_answer: number;
    answers: string[];
}

enum AnswerState {
    Incomplete,
    Incorrect,
    Correct,
}

export const Question = ({ question }: { question: HPQuestion }) => {
    const [currentAnswerId, setCurrentAnswerId] = useState<number>(1);
    const [lockedAnswer, setLockedAnswer] = useState<boolean>(false);
    const [correctlyAnswered, setCorrectlyAnswered] = useState<AnswerState>(
        AnswerState.Incomplete
    );
    const [startTime, setStartTime] = useState<number>(0);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 gap-y-1 w-[calc(75%+12rem)]">
                <div className="col-span-2 mx-3">
                    <p className="text-2xl">{question.question_text}</p>
                </div>
                <div className="col-span-2 md:col-span-1 place-content-center flex justify-center items-center border border-primary-foreground">
                    <Image
                        src={`/images/punktpålinje.png`}
                        width="0"
                        className="m-2 md:mx-8 md:my-8"
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
                            <label
                                className={`block h-full border-2 border-primary-foreground py-4 rounded-lg  has-[:checked]:bg-primary-foreground  ${
                                    correctlyAnswered === AnswerState.Correct
                                        ? "has-[:checked]:border-green-600  has-[:checked]:scale-105 transition-transform duration-200 ease-out  has-[:checked]:text-green-200 has-[:checked]:font-bold text-muted"
                                        : correctlyAnswered ===
                                          AnswerState.Incorrect
                                        ? "has-[:checked]:border-red-600"
                                        : "has-[:checked]:border-primary has-[:checked]:animate-wiggle"
                                }`}
                            >
                                <input
                                    defaultChecked={index == 0}
                                    type="radio"
                                    name="data-answers"
                                    className="hidden"
                                    onChange={() => {
                                        setCurrentAnswerId(index + 1);
                                        console.log(question.correct_answer);
                                    }}
                                    disabled={lockedAnswer}
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
                        className="uppercase text-lg bg-amber-500 py-4 font-semibold border-4 border-amber-200 mx-3 my-2 w-11/12 rounded-lg hover:bg-amber-400 hover:border-amber-600 "
                        onClick={() => {
                            setLockedAnswer(true);

                            setCorrectlyAnswered(
                                currentAnswerId === question.correct_answer
                                    ? AnswerState.Correct
                                    : AnswerState.Incorrect
                            );

                            submitAnswer(
                                question.id,
                                currentAnswerId === question.correct_answer,
                                Date.now() - startTime
                            );

                            console.log(
                                currentAnswerId === question.correct_answer
                            );
                        }}
                    >
                        Check
                    </button>
                </div>
            </div>
        </div>
    );
};
