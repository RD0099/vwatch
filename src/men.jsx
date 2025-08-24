import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "women.css"; // Assuming you have a CSS file for styling

export default function Women() {
  const [watches, setWatches] = useState([]);

  useEffect(() => {
    axios
      axios.get("http://localhost/vwatch/vwatch-backend/get_watches.php?gender=men")
      .then((res) => setWatches(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Men’s Watches</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watches.map((watch) => (
          <Link
            to={`/watch/${watch.watch_id}`}
            key={watch.watch_id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={`http://localhost/vwatch/${watch.image_url}`}
              alt={watch.watch_name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{watch.watch_name}</h3>
              <p className="text-gray-600">₹{watch.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
