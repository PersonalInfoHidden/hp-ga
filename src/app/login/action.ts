'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { isEmail, normalizeEmail } from "validator"

export default async function login(formData: FormData) {
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

  const data = {
    email,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
