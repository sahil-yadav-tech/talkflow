import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/axios";


const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      );

      console.log(
        "Register response:",
        response.data
      );

      if (response.data.success) {
        navigate("/profile");
      }
    } catch (error) {
      console.error(
        "Register error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <br />

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
          {loading
            ? "Creating account..."
            : "Register"}
        </button>
      </form>

      <br />

      <p>
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;