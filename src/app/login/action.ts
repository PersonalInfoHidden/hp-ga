"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { isEmail, normalizeEmail } from "validator";

export default async function login(state: any, formData: FormData) {
  const supabase = createClient();

  var email = formData.get("email") as string;

  if (!isEmail(email)) {
    // Tell user that their email is invalid
    //TODO FIXME
    return {
      emailError: "Your email is invalid, just like you",
      loginError: "",
    };
  }

  if (!normalizeEmail(email)) {
    return {
      emailError: "Your email could not be normalized",
      loginError: "",
    };
  }
  email = normalizeEmail(email) as string;

  const data = {
    email,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    if (error.code === "invalid_credentials") {
      return {
        emailError: "",
        loginError: "Your credentials are invalid",
      };
    }
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
