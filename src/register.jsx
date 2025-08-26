import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";   // ✅ useHistory instead of useNavigate
import "./auth.css";

export default function Register() {
  const [name, setName] = useState("");     
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();   // ✅ useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/vwatch/vwatch-backend/register.php", {
        name,
        email,
        password,
      });

      setMessage(res.data.message);

      if (res.data.status === "success") {
        history.push("/");   // ✅ use history.push instead of navigate
      }
    } catch (error) {
      setMessage("Registration failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
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
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
