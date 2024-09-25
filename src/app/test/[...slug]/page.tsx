import React from "react";
import { promises as fs } from "fs";
import { HPQuestion } from "@/app/example1/page";

interface Questions {
    verb1?: HPQuestion[];
    kva1?: HPQuestion[];
    verb2?: HPQuestion[];
    kva2?: HPQuestion[];
}

export default async function Page({ params }: { params: { slug: string[] } }) {
    const slugLength = params.slug.length;
    const file = await fs.readFile(
        process.cwd() + `/public/tests/${params.slug[0]}.json`,
        "utf8"
    );
    const data: Questions | null = JSON.parse(file);

    if (data === null) return <div></div>;

    if (slugLength !== 3) return <div>not enought slugs 🐌🐌🐌</div>;

    return <div>My Post: </div>;
}
