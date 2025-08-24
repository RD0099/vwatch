import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  // Load categories on page load
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost/vwatch/vwatch-backend/category_list.php");
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add / Update category
  const handleSave = async () => {
    if (!name.trim()) {
      setMessage("Category name required");
      return;
    }

    try {
      let res;
      if (editId) {
        res = await axios.post("http://localhost/vwatch/vwatch-backend/category_update.php", {
          id: editId,
          name,
        });
      } else {
        res = await axios.post("http://localhost/vwatch/vwatch-backend/category_add.php", { name });
      }

      setMessage(res.data.message);
      setName("");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  // Edit category
  const handleEdit = (cat) => {
    setName(cat.name);
    setEditId(cat.id);
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      const res = await axios.post("http://localhost/vwatch/vwatch-backend/category_delete.php", { id });
      setMessage(res.data.message);
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting category");
    }
  };

  return (
    <div className="admin-page">
      <h2>Manage Categories</h2>

      <div className="form-box">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSave}>{editId ? "Update" : "Add"}</button>
        {editId && (
          <button onClick={() => { setName(""); setEditId(null); }}>Cancel</button>
        )}
      </div>

      {message && <p className="msg">{message}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button onClick={() => handleDelete(cat.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
