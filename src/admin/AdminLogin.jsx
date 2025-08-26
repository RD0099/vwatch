import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";  // ✅ useHistory instead of useNavigate
import "./admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();  // ✅ useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ send as form-data
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const res = await axios.post(
        "http://localhost/vwatch/vwatch-backend/admin_login.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        history.push("/admin-dashboard");  // ✅ replaced navigate with history.push
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
