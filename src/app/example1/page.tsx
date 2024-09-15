import React from "react";
import Question from "./question";
import { promises as fs } from "fs";

export interface HPQuestion {
    name: string;
    id: number;
    question_text: string;
    image_path: string;
    correct_answer: number;
    answers: string[];
}

export default async function Page() {
    const file = await fs.readFile(
        process.cwd() + "/public/ExampleQuestion.json",
        "utf8"
    );
    const data: HPQuestion | null = JSON.parse(file);

    if (data === null) return <div></div>;

    return (
        <div>
            <Question question={data} />
        </div>
    );
}
