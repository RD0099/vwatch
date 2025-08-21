// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Women from "./women";
import WatchDetails from "./WatchDetails";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

// user pages
import Login from "./login";
import Register from "./register";
import Logout from "./logout";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navigation
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/women">Women</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/logout">Logout</Link>
      </nav> */}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/watch/:id" element={<WatchDetails />} />

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* User */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* 404 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}