import { useEffect, useState } from "react";
import Clients from "./Clients";
import Services from "./Services";
const API = import.meta.env.VITE_API_URL;
import "./App.css"
import Contact from "./Contact";
import Info from "./info";
import Navbar from "./Navbar";

export default function App() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`${API}/profile`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((e) => setErr(e.message));
  }, []);

  if (err) return <p style={{ color: "red" }}>Error: {err}</p>;
  if (!data) return <p>Loading...</p>;

  // Optional: Cloudinary auto format + auto quality
  const photo = data.photo_url?.includes("res.cloudinary.com")
    ? data.photo_url.replace("/upload/", "/upload/f_auto,q_auto/")
    : data.photo_url;

  return (
    <>
      <main
        style={{
       
          marginTop: "4rem",
          fontFamily: "system-ui",
        }}
      >
        <div className="container">
          <img
            src={photo}
            alt="Profile"
            width="55%"
            height="55%"
            style={{
              objectFit: "cover",
              marginTop : "-90px"
            }}
          />
          <div className="desc">
            <p className="name">{data.title}</p>
               <p className="bio">{data.bio}</p>
            </div>
            </div>
         
      
      </main>
      <Navbar/>
      <Info/>
     <br /><br /><br /><br /><br />
      <Clients />
      <br />
      <Services />
      <br /><br />
      <Contact/>
      <hr />
     <h5 style={{textAlign : "center"}}> © 2025 BrandBanao.Ai. All Rights Reserved.</h5>
    </>
  );
}
