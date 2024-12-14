use regex::Regex;
use serde::{Deserialize, Serialize};
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
    let lines: Vec<String> = file
        .lines()
        .map(|x| x.trim().to_owned())
        .filter(|s| s.len() > 0)
        .collect();

    let answer_lines_begin = lines
        .iter()
        .position(|x| *x == "answers:")
        .expect("Could not find section answers:")
        + 1;
    let type_lines_begin = lines
        .iter()
        .position(|x| *x == "type:")
        .expect("Could not find section type:")
        + 1;
    let test_lines_begin = lines
        .iter()
        .position(|x| *x == "test:")
        .expect("Could not find section test:")
        + 1;

    let question_lines = lines[0..answer_lines_begin - 1].to_vec();
    let answer_lines = lines[answer_lines_begin..type_lines_begin - 1]
        .iter()
        .map(|s| s.to_uppercase())
        .collect::<Vec<String>>();
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

    if q_type == "ORD" {
        assert_eq!(question_lines.len(), 60, "Incorrect questions");
        assert_eq!(answer_lines.len(), 10, "Incorrect answers");
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
    } else if q_type == "MEK" {
        assert_eq!(answer_lines.len(), 10, "Not enough answers!");

        let question_regex = Regex::new(r"\n\d\d\. ").unwrap();
        for (index, text) in question_regex.split(&question_lines.join("\n")).enumerate() {
            let mut q = text;
            if q.starts_with(|c: char| c.is_ascii_digit()) {
                q = &text[4..];
            }
            let part_regex = Regex::new(r"\nA ").unwrap();
            let parts: Vec<&str> = part_regex.split(q).collect();

            let question_text = parts[0].replace('\n', " ").to_owned();

            let answer_regex = Regex::new(r"\n[B|C|D|E] ").unwrap();
            let answers: Vec<String> = answer_regex.split(parts[1]).map(|s|s.to_owned()).collect();
            let correct_answer: u8 = answer_lines
                .iter()
                .map(|x| x.as_bytes()[0] - 64)
                .collect::<Vec<u8>>()[index];

            questions.push(Question {
                question_text,
                answers,
                correct_answer,
                q_type: q_type.to_owned(),
                additional_resources: (),
                test: test.to_owned(),
            });
        }

        // let answers: Vec<(usize, String)> = question_lines
        //     .iter()
        //     .enumerate()
        //     .filter(|(_, l)| {
        //         l.starts_with(&['A', 'B', 'C', 'D', 'E'])
        //             && l.chars().nth(1).expect("Too short line!") == ' '
        //     })
        //     .map(|(i,l)| (i, (&l[2..]).to_owned()))
        //     .collect();
    } else {
        println!("Unknown question type!");
        panic!();
    }

    fs::write(
        "public/questions.json",
        serde_json::to_string_pretty(&questions).expect("Could not convert to JSON"),
    )
    .expect("Could not write questions.json")
}
