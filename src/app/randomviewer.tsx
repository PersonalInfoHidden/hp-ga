import { promises as fs } from "fs";
import { HPQuestion } from "@/components/question";
import RandomQuestions from "./randomquestion";

export const RandomViewer = async () => {
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

    // Lägg in ID automatiskt
    for (let i = 0; i < questions.length; i++) {
        questions[i].id = i;
    }

    return (
        <div>
            <RandomQuestions questions={questions} />
        </div>
    );
};
