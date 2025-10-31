import React, { useState } from "react";

 function Contact() {
  // Step 1: Define form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Step 2: Define feedback state
  const [status, setStatus] = useState(null); // {type, text}
  const [loading, setLoading] = useState(false);

  // Step 3: Handle input changes
  function handleChange(e) {
    const { name, value } = e.target; // 👈 object destructuring
    setForm((prev) => ({
      ...prev,        // 👈 spread operator (copy old form)
      [name]: value,  // 👈 update only the field being typed
    }));
  }

  // Step 4: Handle submit
  function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    // Frontend validation
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", text: "⚠️ Please fill all fields." });
      setLoading(false);
      return;
    }

    //  Send data to backend (Node + Express)
    fetch("http://localhost:4000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setStatus({
            type: "success",
            text: "✅ Message sent successfully!",
          });
          setForm({ name: "", email: "", message: "" }); // clear form
        } else {
          setStatus({
            type: "error",
            text: data.error || "Server error. Please try again.",
          });
        }
      })
      .catch((err) => {
        console.error("Network error:", err);
        setStatus({
          type: "error",
          text: "⚠️ Network error. Please check your connection.",
        });
      })
      .finally(() => setLoading(false)); // stop spinner no matter what
  }

  // Step 5: JSX UI
  return (
    <section id="contact">
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Book an appointment</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
          style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 15px",
            background: loading ? "#aaa" : "#007BFF",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && (
          <p
            style={{
              color: status.type === "success" ? "green" : "crimson",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {status.text}
          </p>
        )}
      </form>
    </div>
    </section>
    
  );
}

export default Contact;
