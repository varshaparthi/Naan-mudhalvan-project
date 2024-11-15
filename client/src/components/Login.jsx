import React, { useContext, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";
import "../styles/Login.css";

const Login = ({ setIsLogin }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login();
      // Navigate to the dashboard or home page if login is successful
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="authForm" onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p>
        Not registered? <span onClick={() => setIsLogin(false)}>Register</span>
      </p>
    </form>
  );
};

export default Login;
