import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";   // ✅ useHistory in v5
import "./admin.css";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    watches: 0,
    orders: 0,
    categories: 0,
  });

  const history = useHistory();   // ✅ replace navigate with history

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await axios.get("http://localhost/vwatch/vwatch-backend/dashboard_counts.php");
      if (res.data.success) {
        setCounts(res.data.counts);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card">USERS <p>{counts.users}</p></div>
        <div className="card">WATCHES <p>{counts.watches}</p></div>
        <div className="card">ORDERS <p>{counts.orders}</p></div>
        <div className="card">CATEGORIES <p>{counts.categories}</p></div>
      </div>

      <div className="actions">
        <button onClick={() => history.push("/manage-watches")}>Manage Watches</button>
        <button onClick={() => history.push("/manage-orders")}>Manage Orders</button>
        <button onClick={() => history.push("/manage-users")}>Manage Users</button>
        <button onClick={() => history.push("/admin-categories")}>Categories</button>
      </div>
    </div>
  );
}
