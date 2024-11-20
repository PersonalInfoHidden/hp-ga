import signup from "./action";

export default function SignupPage() {
    return (
        <div>
            <form>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                />
                <button formAction={signup}>Sign up</button>
            </form>
            <a href="/login">Got an account? Log in!</a>
            <br />
            <a href="/terms-and-conditions">Terms and Conditions</a>
        </div>
    );
}
