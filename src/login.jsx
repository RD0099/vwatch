import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";   // ✅ useHistory instead of useNavigate
import "./auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();   // ✅ useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/vwatch/vwatch-backend/login.php", {
        email,
        password,
      });

      setMessage(res.data.message);

      if (res.data.status === "success") {
        history.push("/home");   // ✅ use history.push instead of navigate
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <p>Don’t have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
