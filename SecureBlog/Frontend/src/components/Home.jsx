import { useEffect, useState } from "react";
import API from "../services/api";
import "./Home.css"; // Import the new CSS file

export default function Home() { // Corrected typo: Hone to Home
  const [me, setMe] = useState(null);
  const [err, setErr] = useState("");

  return (
    <div className="home-container">
      <h1>Welcome to SecureBlog</h1>
      <p>Your secure platform for sharing thoughts and ideas.</p>
      {err && <p className="error-message">{err}</p>}
      {me ? (
        <pre>{JSON.stringify(me, null, 2)}</pre>
      ) : (
        <div className="home-links">
          <a href="/register">Register</a>
          <a href="/login">Login</a>
        </div>
      )}
    </div>
  );
}