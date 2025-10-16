import React, { useState, useEffect } from 'react';

// Constants for validation rules
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

const LoginForm = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // State to control the submit button's 'disabled' attribute
  const [isFormValid, setIsFormValid] = useState(false);

  // --- Validation Logic Functions ---

  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email is required.';
    }
    if (!EMAIL_REGEX.test(value)) {
      return 'Invalid email format.';
    }
    return ''; // Valid
  };

  const validatePassword = (value) => {
    if (!value) {
      return 'Password is required.';
    }
    if (value.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    return ''; // Valid
  };

  // --- Effect to Update Button State ---
  // Re-runs whenever email or password state changes.
  useEffect(() => {
    // Check for errors based on current state values
    const emailHasError = validateEmail(email) !== '';
    const passwordHasError = validatePassword(password) !== '';
    
    // The form is valid only if both fields pass validation
    const isValid = !emailHasError && !passwordHasError;
    
    // Set state to enable/disable the button
    setIsFormValid(isValid);
    
  }, [email, password]); 

  // --- Event Handlers ---

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Show real-time error feedback
    setEmailError(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Show real-time error feedback
    setPasswordError(validatePassword(newPassword));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check (good for showing errors on untouched fields on first submission)
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));

    if (isFormValid) {
      console.log('Form submitted successfully!', { email, password });
      alert('Login successful! Proceeding to server...');
      // API Submission logic goes here
    } else {
      console.log('Form is invalid. Submission prevented.');
    }
  };

  return (
    <div className="login-container">
      <h2>Question 4 - Form Validation</h2>
      <form onSubmit={handleSubmit} noValidate>
        
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="test@example.com"
            className={emailError ? 'input-error' : ''}
            required
          />
          {/* REQUIREMENT: Show error message below the input if email is invalid. */}
          {emailError && (
            <p className="error-message">
              {emailError}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder={`Min ${MIN_PASSWORD_LENGTH} characters`}
            className={passwordError ? 'input-error' : ''}
            required
            minLength={MIN_PASSWORD_LENGTH}
          />
          {passwordError && (
            <p className="error-message">
              {passwordError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={!isFormValid} // REQUIREMENT: Disable the submit button if the form is invalid.
          className="submit-button"
        >
          {isFormValid ? 'Submit' : 'Form Invalid'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;