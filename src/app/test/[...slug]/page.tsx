import React from "react";
import { promises as fs } from "fs";
import { HPQuestion } from "@/app/example1/page";
import Question from "@/app/example1/question";

interface Questions {
    verb1: HPQuestion[];
    kva1: HPQuestion[];
    verb2: HPQuestion[];
    kva2: HPQuestion[];
}

/*
"verb1": [
        {
            "id": 0,
            "type": "ORD",
            "question_text": "dispyt",
            "correct_answer": 2,
            "answers": ["brist", "gräl", "tvekan", "besvikelse", "undantag"]
        }
    ],
*/
export default async function Page({ params }: { params: { slug: string[] } }) {
    const slugLength = params.slug.length;
    const file = await fs.readFile(
        process.cwd() + `/public/tests/${params.slug[0]}.json`,
        "utf8"
    );
    const data: Questions | null = JSON.parse(file);

    if (data === null) return <div></div>;

    if (slugLength !== 3) return <div>not enought slugs 🐌🐌🐌</div>;

    if (!Object.hasOwn(data, params.slug[1])) return <div>Wrong Keys</div>;

    return (
        <div>
            <Question
                question={
                    data[params.slug[1] as keyof typeof data][
                        parseInt(params.slug[2])
                    ]
                }
            />
        </div>
    );
}
