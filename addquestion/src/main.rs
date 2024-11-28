use serde::{Deserialize, Serialize};
use serde_json::{json, Result, Value};
use std::{fmt::Debug, fs};

#[derive(Serialize, Deserialize, Debug)]
struct Question {
    question_text: String,
    answers: Vec<String>,
    correct_answer: u8,
    #[serde(rename = "type")]
    q_type: String,
    additional_resources: (),
    test: String,
}

fn main() {
    let mut questions: Vec<Question> = serde_json::from_slice(
        fs::read("public/questions.json")
            .expect("Cant read questions.json!")
            .as_slice(),
    )
    .expect("Cant parse questions.json");
    let file = fs::read_to_string("q.txt").expect("Cant open q.txt");
    let lines: Vec<String> = file.lines().map(|x| x.trim().to_owned()).collect();

    let answer_lines_begin = lines
        .iter()
        .position(|x| *x == "answers:")
        .expect("Could not find answers:")
        + 1;
    let type_lines_begin = lines
        .iter()
        .position(|x| *x == "type:")
        .expect("Could not find type:")
        + 1;
    let test_lines_begin = lines
        .iter()
        .position(|x| *x == "test:")
        .expect("Could not find test:")
        + 1;

    let question_lines = lines[0..answer_lines_begin - 1].to_vec();
    let answer_lines = lines[answer_lines_begin..type_lines_begin - 1].to_vec();
    let type_lines = lines[type_lines_begin..test_lines_begin - 1].to_vec();
    let test_lines = lines[test_lines_begin..].to_vec();

    assert_eq!(
        test_lines.len(),
        1,
        "Section test: should only have one line"
    );
    let test: String = test_lines.concat();

    assert_eq!(
        type_lines.len(),
        1,
        "Section type: should only have one line"
    );
    let q_type: String = type_lines.concat();

    println!("{test}");
    println!("{q_type}");

    if q_type == "ORD" {
        for parsed_questions in 0..10 {
            let mut split = question_lines[parsed_questions * 6].split('.');
            let question_idx = str::parse::<usize>(split.next().expect("Malformed questions!"))
                .expect("Malformed questions!");
            let question_text = split.collect::<String>().trim().to_owned();
            let answers: Vec<String> = question_lines
                [parsed_questions * 6 + 1..parsed_questions * 6 + 6]
                .iter()
                .map(|s| s.split_once(' ').expect("Malformed Answer!").1.to_owned())
                .collect();
            let correct_answer: u8 = answer_lines
                .iter()
                .map(|x| x.as_bytes()[0] - 64)
                .collect::<Vec<u8>>()[question_idx - 1];

            questions.push(Question {
                question_text,
                answers,
                correct_answer,
                q_type: q_type.clone(),
                additional_resources: (),
                test: test.clone(),
            });
        }
    } else {
        println!("Unknown question type!");
        panic!();
    }

    fs::write("public/questions.json", serde_json::to_string_pretty(&questions).expect("Could not convert to JSON")).expect("Could not write questions.json")
}
