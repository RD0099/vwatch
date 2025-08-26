import React, { useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";   // ✅ useHistory instead of useNavigate
import "./auth.css";

export default function Logout() {
  const history = useHistory();   // ✅ useHistory hook

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
          history.push("/");   // ✅ history.push instead of navigate("/")
        } else {
          alert("Logout failed");
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    };

    doLogout();
  }, [history]);   // ✅ depend on history, not navigate

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Logging out...</h2>
      </div>
    </div>
  );
}
