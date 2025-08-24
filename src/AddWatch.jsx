import React, { useState } from "react";

const [form, setForm] = useState({
  collection_id: "",
  brand_id: "",
  gender: "women", // optional if you're using this
  watch_name: "",
  description: "",
  image_url: "",
  price: "",
  discount: "",
  stock: "",
  status: "active",
  category: "", // <-- include this
});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost/vwatch/vwatch-backend/add_watch.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message);
  };

 <select name="category" onChange={handleChange}>
  <option value="">Select Category</option>
  <option value="women">Women</option>
  <option value="men">Men</option>
  <option value="couple">Couple</option>
  <option value="kids">Kids</option>
  <option value="smart">Smart</option>
</select>
 
  return (
    <form onSubmit={handleSubmit}>
      <input name="watch_name" placeholder="Watch Name" onChange={handleChange} />
      <input name="brand_id" placeholder="Brand ID" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="discount" type="number" placeholder="Discount" onChange={handleChange} />
      <input name="stock" type="number" placeholder="Stock" onChange={handleChange} />
      <input name="image_url" placeholder="Image URL" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <button type="submit">Add Watch</button>
    </form>
  );

