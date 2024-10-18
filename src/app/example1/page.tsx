import React from "react";
import { Question, HPQuestion } from "@/components/question";
import { promises as fs } from "fs";

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
