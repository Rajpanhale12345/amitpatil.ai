import { useEffect, useState } from "react";
// import "./Info.css";

const API = import.meta.env.VITE_API_URL;

export default function Info() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`${API}/info`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(Array.isArray(json) ? json : [json]);
      })
      .catch((e) => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red" }}>Error: {err}</p>;
  if (!data) return <p>Loading...</p>;
  if (data.length === 0) return <p>No information found.</p>;

  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "4rem",
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>About</h1>
      <h3></h3>
      <br />

      {/* 🧩 Just plain text, no cards */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "1rem",
          fontSize: "1.2rem",
          color: "#333",
          lineHeight: "1.6",
        }}
      >
        {data.map((item) => (
          <p key={item.id ?? item.information}>{item.information}</p>
        ))}
      </section>

      <a
        href="https://brandbanao.ai/index.html"
        target="_blank"
        rel="noopener noreferrer"
      >
       
      </a>

      <br />
      <hr />
    </main>
  );
}
