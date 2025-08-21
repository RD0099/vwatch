import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost/vwatch/vwatch-backend/admin_login.php",
        { email, password }, // send as JSON
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        // store admin in localStorage
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/admin-dashboard"); // redirect to dashboard
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
