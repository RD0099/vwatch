import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        const res = await axios.post(
          "http://localhost/vwatch/vwatch-backend/logout.php",
          {},
          { withCredentials: true } // important for PHP sessions
        );

        if (res.data.status === "success") {
          alert(res.data.message);
          navigate("/"); // redirect to home
        } else {
          alert("Logout failed");
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    };

    doLogout();
  }, [navigate]);

  return (
     <div className="auth-container">
      <div className="auth-box">
        <h2>Logging out...</h2>
      </div>
    </div>
  );
  // <h2>Logging out...</h2>;
}
