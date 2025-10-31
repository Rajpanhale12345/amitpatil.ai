import { useEffect, useState } from "react";
import "./Clients.css"
const API = import.meta.env.VITE_API_URL;

export default function Clients() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
        fetch(`${API}/clients`)
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })  
        .then((json) => {
            // Ensure it's always an array
            setData(Array.isArray(json) ? json : []);
        })
        .catch((e) => setErr(e.message));
    }, []);

  if (err) return <p style={{ color: "red" }}>Error: {err}</p>;
  if (!data) return <p>Loading...</p>;
  if (data.length === 0) return <p>No clients found.</p>;

  return (
    <main   
      style={{
        textAlign: "center",
        marginTop: "4rem",
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Clientele</h1><br /><br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {data.map((client) => {
          // Optional: Cloudinary auto format + quality optimization
          const logo = client.logo_url?.includes("res.cloudinary.com")
            ? client.logo_url.replace("/upload/", "/upload/f_auto,q_auto/")
            : client.logo_url;

          return (
            <article
              key={client.id}
              style={{
                border: "1px solid #eee",
                borderRadius: "12px",
                padding: "1rem",
                background: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              {logo ? (
                <img
                  src={logo}
                  alt={client.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRight: "2px solid #ecebebff",
                      borderBottom: "2px solid #e7d6d6ff",
                    objectFit: "contain",
                    marginBottom: "0.75rem",    
                    backgroundColor: "#fff",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: "120px",
                    display: "grid",
                    placeItems: "center",
                    background: "#fafafa",
                    marginBottom: "0.75rem",
                    fontWeight: 600,
                    color: "#555",
                   className : "name"
                  }}
                >
                  {client.name}
                </div>
              )}
              {/* <h3 style={{ margin: "0.5rem 0" }}>{client.name}</h3> */}
          
            </article>
            
          );
        })}
      </div>
      <a href="https://brandbanao.ai/index.html"><h2 style={{color : " rgb(190, 167, 15)"}}>Tap to View more...</h2></a>
  <br /><br /> <hr /> </main> 
  );
}
