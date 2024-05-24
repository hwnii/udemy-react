import { useState } from "react";

import "./AuthInputs.css";

export default function AuthInputs() {
  const [enteredInput, setEnteredInput] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    setEnteredInput((prevInput) => ({
      ...prevInput,
      [identifier]: value,
    }));
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredInput["email"].includes("@");
  const passwordNotValid =
    submitted && enteredInput["password"].trim().length < 6;

  return (
    <div id="auth-inputs">
      <div className="controls">
        <p>
          <label>Email</label>
          <input
            type="email"
            className={emailNotValid ? "invalid" : undefined}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            className={passwordNotValid ? "invalid" : undefined}
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
          />
        </p>
      </div>
      <p>Some text</p>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <button className="button" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
}
