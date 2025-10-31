import { useState, useEffect } from "react";
import "./services.css"
const API = import.meta.env.VITE_API_URL;

export default function Services() {
    const [data, setData] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(() => {
        fetch(`${API}/services`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                setData(Array.isArray(json) ? json
                    : []);
            })
            .catch((e) => setErr(e.message));
    }, []);

    if (err) return <p style={{ textAlign: 'center' }}>Error : {err}</p>;
    if (!data) return <p style={{ textAlign: "center" }}>Wait while we are loading things for you...</p>;
    if (data.length === 0) return <p style={{ textAlign: "center" }}>No services found</p>;
    return (
        <>
            <h1>Services</h1>
            <br /><br />
            <div className="service_container">
               
                {data.map((service) => (
                    <div className="img" key={service.id}>
                        <img src={service.services_url} alt={service.name} id="image"  />
                        <h2 style={{ textAlign: "center" }}>{service.name}</h2>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

