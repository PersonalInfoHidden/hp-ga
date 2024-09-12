"use client";

import { useFormState } from "react-dom";
import { useRef } from "react"
import login from "./action";

export default function LoginPage() {
  const [state, formAction] = useFormState(login, {
    emailError: "",
    loginError: "",
  });

  const ref = useRef<HTMLFormElement>(null)

  return (
    <form ref={ref}
      action={async (formData) => {
        formAction(formData)
        ref.current?.reset()
      }}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <p aria-live="polite">{state?.emailError}</p>
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <p aria-live="polite">{state?.loginError}</p>
      <button type="submit">Log in</button>
    </form>
  );
}
