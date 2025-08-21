import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const a = localStorage.getItem("admin");
    if (!a) {
      navigate("/admin-login");
      return;
    }
    setAdmin(JSON.parse(a));

    axios
      .get("http://localhost/vwatch/vwatch-backend/admin_stats.php")
      .then((res) => {
        if (res.data?.success) setStats(res.data.stats);
      })
      .catch(() => {});
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-page">
      <header className="admin-topbar">
        <div className="left">
          <span className="admin-logo">VWatch Admin</span>
        </div>
        <div className="right">
          {admin && <span className="admin-name">Hi, {admin.name}</span>}
          <button className="admin-out" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="admin-main">
        <h2>Dashboard</h2>

        <div className="cards">
          <div className="card">
            <div className="card-title">Users</div>
            <div className="card-num">{stats?.users ?? "-"}</div>
          </div>
          <div className="card">
            <div className="card-title">Watches</div>
            <div className="card-num">{stats?.watches ?? "-"}</div>
          </div>
          <div className="card">
            <div className="card-title">Orders</div>
            <div className="card-num">{stats?.orders ?? "-"}</div>
          </div>
          <div className="card">
            <div className="card-title">Categories</div>
            <div className="card-num">{stats?.categories ?? "-"}</div>
          </div>
        </div>

        <div className="quick-links">
          <button className="link-btn">Manage Watches</button>
          <button className="link-btn">Manage Orders</button>
          <button className="link-btn">Manage Users</button>
          <button className="link-btn">Categories</button>
        </div>
      </main>
    </div>
  );
}