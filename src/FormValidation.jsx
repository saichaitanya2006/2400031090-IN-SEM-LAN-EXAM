import React, { useState } from "react";

function FormValidation() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Email validation regex
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setEmailError("❌ Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const validEmail = validateEmail(value);
    setIsValid(validEmail && password.length >= 6);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsValid(validateEmail(email) && value.length >= 6);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Form Submitted Successfully!");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          required
        />
        {emailError && <p className="error-text">{emailError}</p>}
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password (min 6 chars)"
          required
        />
        {password && password.length < 6 && (
          <p className="error-text">❌ Password must be at least 6 characters</p>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default FormValidation;
