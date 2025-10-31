import { useState, useEffect } from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const sections = [
 
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <>
      <header className="hb-header">
       <a href="tel: 9156785678"> <button> Arrange a Call      
        </button></a>
      </header>

      {/* Fullscreen overlay */}
      <div className={`menu-overlay ${open ? "show" : ""}`}>
        <ul className="overlay-list">
          {sections.map((s) => (
            <li key={s.id}>
              <button className="overlay-link" onClick={() => scrollToSection(s.id)}>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
