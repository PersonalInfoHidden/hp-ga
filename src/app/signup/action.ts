'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { isEmail, normalizeEmail } from "validator"

export default async function signup(formData: FormData) {
  const supabase = createClient();

  var email = formData.get("email") as string;

  if (!isEmail(email)) {
    // Tell user that their email is invalid
    //TODO FIXME
    redirect("/error");
  }

  if (!normalizeEmail(email)) {
    redirect("/error");
  }
  email = normalizeEmail(email) as string;

  const password = formData.get("password") as string

  if (password !== formData.get("confirmPassword") as string) {
    redirect("/error")
  }

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
