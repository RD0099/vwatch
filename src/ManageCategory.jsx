import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageCategory({ categoryId, categoryName }) {
  const [watches, setWatches] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  useEffect(() => {
    fetchWatches();
  }, []);

  const fetchWatches = async () => {
    const res = await axios.get(`http://localhost/vwatch-backend/get_watches.php?category_id=${categoryId}`);
    if (res.data.success) {
      setWatches(res.data.watches);
    }
  };

  const addWatch = async () => {
    await axios.post("http://localhost/vwatch-backend/add_watch.php", {
      ...form,
      category_id: categoryId
    });
    fetchWatches();
  };

  const updateWatch = async (id) => {
    await axios.post("http://localhost/vwatch-backend/update_watch.php", {
      id,
      ...form
    });
    fetchWatches();
  };

  const deleteWatch = async (id) => {
    await axios.get(`http://localhost/vwatch-backend/delete_watch.php?id=${id}`);
    fetchWatches();
  };

  return (
    <div>
      <h2>{categoryName} Watches</h2>

      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
      <input placeholder="Price" onChange={e => setForm({...form, price: e.target.value})} />
      <input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} />
      <button onClick={addWatch}>Add Watch</button>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {watches.map(w => (
            <tr key={w.id}>
              <td>{w.id}</td>
              <td>{w.name}</td>
              <td>{w.price}</td>
              <td>{w.description}</td>
              <td>
                <button onClick={() => updateWatch(w.id)}>Update</button>
                <button onClick={() => deleteWatch(w.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
