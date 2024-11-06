"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function submitAnswer(
  question_id: number,
  correct_answer: boolean,
  time_to_answer: number
) {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();

  await supabase.from("answer").insert({
    user_id: user?.id,
    question_id,
    correct_answer,
    time_to_answer,
  });
}
