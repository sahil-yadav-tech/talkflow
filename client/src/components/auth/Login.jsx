import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../lib/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await api.post(
        "/auth/login",
        formData
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <br />

      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;