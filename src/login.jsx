import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./auth.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/vwatch/vwatch-backend/login.php", {
        email,
        password,
      });

      setMessage(res.data.message);

      if (res.data.status === "success") {
        navigate("/home"); // redirect to Home page
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
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <p>Don’t have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
    // <div>
    //   <h2>User Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     /><br/>
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     /><br/>
    //     <button type="submit">Login</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
  );
}
