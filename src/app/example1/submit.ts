"use server";
import { createClient } from "@/utils/supabase/server";

export default async function submitAnswer(
  question_id: number,
  correct_answer: boolean,
  time_to_answer: number
) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  supabase.from("answer").insert({
    user_id: data?.session?.user,
    question_id,
    correct_answer,
    time_to_answer,
  });
}
