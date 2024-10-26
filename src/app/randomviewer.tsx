import { promises as fs } from "fs";
import { Question, HPQuestion } from "@/components/question";

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
            <Question
                question={
                    questions[Math.floor(Math.random() * questions.length)]
                }
            ></Question>
        </div>
    );
};
