// Script to make new questions
// Run with `node addquestion.js [question type] [test]`
const fs = require("node:fs");

if (process.argv.length !== 4) {
    console.log(
        "Incorrect arguments! Run with `node addquestion.js [question type] [test]`"
    );
    process.exit(1);
}

let questions = JSON.parse(fs.readFileSync("public/questions.json"));
let question = {
    type: process.argv[2],
    test: process.argv[3],
};

if (process.argv[2] == "ORD") {
    let lines = fs.readFileSync("q.txt").toString().split('\n');
    let question_texts = [[]];

    if (lines.length != 60) {
        console.log(
            "Incorrect number of lines in q.txt!"
        );
        process.exit(1);
    }

    for (let q = 0; q < 10; q++) {
        for (let l = 0; l < 6; l++) {
            question_texts[q].push(lines.shift())
        }
    }
    console.log(question_texts)

} else {
    console.log("Unknown question type! Only ORD is supported");
    process.exit(1);
}

questions.push(question);
fs.writeFileSync("public/questions.json", JSON.stringify(questions));
