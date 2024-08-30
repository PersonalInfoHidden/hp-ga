import React from 'react';
import punktpålinje from 'publicimagespunktpålinje.png';
import { promises as fs } from 'fs';
import Image from 'next/image';
import { Key } from 'lucide-react';

export interface HPQuestion {
    name: string;
    id: number;
    question_text: string;
    image_path: string;
    correct_answer: number;
    answers: string[];
}

const Question = async () => {
    const file = await fs.readFile(
        process.cwd() + '/public/ExampleQuestion.json',
        'utf8'
    );
    const data: HPQuestion | null = JSON.parse(file);

    if (data === null) return <div></div>;

    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-2 w-[calc(75%+12rem)]">
                <div className="text-center col-span-2 text-8xl py-4 mb-12 mt-6">
                    {data.name}
                </div>
                <div className="col-span-2 md:col-span-1 place-content-center flex justify-center items-center border border-primary-foreground">
                    <Image
                        src={`/images/punktpålinje.png`}
                        width="0"
                        className="mx-16 my-12"
                        height="0"
                        sizes="100vw"
                        style={{
                            width: '75%',
                            height: 'auto',
                            borderRadius: '2rem',
                        }}
                        alt="Picture of the author"
                    />
                </div>
                <ul className="grid list-none gap-y-2">
                    {data.answers.map((value, index) => (
                        <li key={value}>
                            <label className="block h-full border-2 border-primary-foreground rounded has-[:checked]:border-primary has-[:checked]:bg-primary-foreground has-[:checked]:animate-wiggle">
                                <input
                                    defaultChecked={index == 0}
                                    type="radio"
                                    name="data-answers"
                                    className="hidden"
                                />
                                <h1 className="h-full flex justify-center items-center text-2xl">
                                    {value}
                                </h1>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="col-span-2">
                    <div>
                        <button type="submit">oooo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question;
