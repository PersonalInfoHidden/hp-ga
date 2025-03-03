import RandomQuestions from "@/app/randomquestion";
import { HPQuestion } from "@/components/question";
import { promises as fs } from "fs";
import React from "react";

const Page = async () => {
    const file = await fs.readFile(
        process.cwd() + `/public/questions.json`,
        "utf8"
    );
    const questions: [HPQuestion] | null = JSON.parse(file);
    if (questions === null)
        return (
            <div>
                <p>Error</p>
            </div>
        );

    const filterdQuestion = [];

    // Lägg in ID automatiskt
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].type === "ORD" || questions[i].type === "MEK")
            questions[i].id = i;
        filterdQuestion.push(questions[i]);
    }

    return (
        <div>
            <h1 className="text-3xl my-4">Verbal Slump</h1>
            <hr
                className="border-none h-1 mx-4
             bg-black rounded   mb-5"
            ></hr>
            <RandomQuestions questions={questions} />
        </div>
    );
};

export default Page;
