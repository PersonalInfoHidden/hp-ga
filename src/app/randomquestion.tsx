"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import submitAnswer from "../lib/submit";
import { HPQuestion } from "@/components/question";

enum AnswerState {
    Incomplete,
    Incorrect,
    Correct,
}

const RandomQuestions = ({ questions }: { questions: HPQuestion[] }) => {
    const [hasReadInfo, setHasReadInfo] = useState<boolean>(false);
    const [currentAnswerId, setCurrentAnswerId] = useState<number>(1);
    const [lockedAnswer, setLockedAnswer] = useState<boolean>(false);
    const [correctlyAnswered, setCorrectlyAnswered] = useState<AnswerState>(
        AnswerState.Incomplete
    );
    const startingId = Math.floor(Math.random() * questions.length);
    const [question, setQuestion] = useState(questions[startingId]);
    let idsUsed = [startingId];

    const handleNewQuestion = () => {
        let newId;
        do {
            newId = Math.floor(Math.random() * questions.length);
        } while (idsUsed.includes(newId) && idsUsed.length < questions.length);

        if (idsUsed.length < questions.length) {
            idsUsed = [...idsUsed, newId];
        } else {
            alert("All questions have been used!");
        }
        setQuestion(questions[newId]);
    };

    const [startTime, setStartTime] = useState<number>(0);

    useEffect(() => {
        setStartTime(Date.now());
    }, []);

    const AnswerList = () => {
        return (
            <ul
                className={`grid list-none gap-y-2 ${
                    question.additional_resources
                        ? "col-span-2 md:col-span-1"
                        : "col-span-2"
                } px-4 md:px-0`}
            >
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
                                defaultChecked={index == currentAnswerId - 1}
                                type="radio"
                                name="data-answers"
                                className="hidden"
                                onChange={() => {
                                    setCurrentAnswerId(index + 1);
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
        );
    };
    const CheckButton = () => {
        return (
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
        );
    };

    const NextButton = () => {
        return (
            <div className="col-span-2 py-2 grid place-items-center">
                <button
                    onClick={() => {
                        handleNewQuestion();
                        setCorrectlyAnswered(AnswerState.Incomplete);
                        setLockedAnswer(false);
                    }}
                    className="uppercase text-lg bg-amber-500 py-4 font-semibold border-4 border-amber-200 mx-3 my-2 w-11/12 rounded-lg hover:bg-amber-400 hover:border-amber-600 "
                >
                    Next
                </button>
            </div>
        );
    };

    if (question.additional_resources) {
        return (
            <div className="flex items-center justify-center">
                {!hasReadInfo ? (
                    <button
                        onClick={() => setHasReadInfo(true)}
                        
                    className="uppercase text-lg bg-amber-500 py-4 font-semibold border-4 border-amber-200 mx-3 my-2 w-11/12 rounded-lg hover:bg-amber-400 hover:border-amber-600 "

                    > 
                        Klicka här för att börja när du har papper och penna redo

                    </button>
                ) : (
                    <div className="grid grid-cols-2 gap-y-1 w-[calc(75%+12rem)]">
                        <div className="col-span-2 mx-3">
                            <p className="text-2xl">{question.question_text}</p>
                        </div>
                        <div
                            className={`col-span-2 md:col-span-1 place-content-center ${
                                question.additional_resources
                                    ? "flex"
                                    : "hidden"
                            } justify-center items-center border border-primary-foreground`}
                        >
                            <Image
                                src={`/images/${question.additional_resources}`}
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
                        <AnswerList></AnswerList>
                        {correctlyAnswered !== AnswerState.Incomplete ? (
                            <NextButton />
                        ) : (
                            <CheckButton />
                        )}
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="flex items-center justify-center">
                {!hasReadInfo ? (
                    <button
                        onClick={() => setHasReadInfo(true)}
                        className="uppercase text-lg bg-amber-500 py-4 font-semibold border-4 border-amber-200 mx-3 my-2 w-11/12 rounded-lg hover:bg-amber-400 hover:border-amber-600 "
                    >
                        Klicka här för att börja när du har papper och penna redo
                    </button>
                ) : (
                    <div className="grid grid-cols-2 gap-y-1 w-[calc(75%+12rem)]">
                        <div className="col-span-2 mx-3">
                            <p className="text-2xl">{question.question_text}</p>
                        </div>
                        <AnswerList></AnswerList>
                        {correctlyAnswered !== AnswerState.Incomplete ? (
                            <NextButton />
                        ) : (
                            <CheckButton />
                        )}
                    </div>
                )}
            </div>
        );
    }
};

export default RandomQuestions;
