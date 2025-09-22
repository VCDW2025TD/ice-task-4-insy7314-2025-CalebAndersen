import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"

const Register = () => {
  const [email, setEmail] = useState("");       // Stores user input
  const [password, setPassword] = useState(""); // Stores password
  const [error, setError] = useState("");       // Handles errors

  const navigate = useNavigate();               // Used to redirect after success

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Send registration request to backend
      const response = await axios.post("https://localhost:5000/api/auth/register", {
        email,
        password,
      });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard or login page
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </form>
    </div>
  );
};

export default Register;
