import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    if (!form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      await API.post("/auth/register", form);

      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🔐 Privacy Locker</h1>
        <h3>Register</h3>

        <input
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p onClick={() => navigate("/")} style={styles.link}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },

  card: {
    width: "380px",
    padding: "40px 30px",
    background: "#e5e5e5",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",

    // 🔥 MAIN FIX
    boxSizing: "border-box",
    display: "block",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",

    // 🔥 ensures exact alignment
    boxSizing: "border-box",
  },

  link: {
    textAlign: "center",
    color: "#5a5aff",
    cursor: "pointer",
    fontSize: "14px",
  },
};