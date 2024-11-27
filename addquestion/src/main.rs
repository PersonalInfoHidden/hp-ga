use serde::{Deserialize, Serialize};
use serde_json::{Result, Value};
use std::{fs, str::Lines};

#[derive(Serialize, Deserialize)]
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
    let lines: Vec<&str> = file.lines().collect();

    for parsed_questions in 0..10 {
        let question_text="".to_owned();
        let answers = vec!["".to_owned()];
        let correct_answer: u8 = 0;
        let q_type = "".to_owned();
        let test = "".to_owned();

        for line_idx in 0..6 {
            
        }
        questions.push(Question{question_text, answers, correct_answer, q_type, additional_resources: (), test});
    }
}
