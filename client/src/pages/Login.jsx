import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🔐 Privacy Locker</h1>
        <h3>Login</h3>

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

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        <p onClick={() => navigate("/register")} style={styles.link}>
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
}

// Simple styling
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

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",

    // 🔥 IMPORTANT FIXES
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

    // 🔥 IMPORTANT
    boxSizing: "border-box",
  },

  link: {
    textAlign: "center",
    color: "#5a5aff",
    cursor: "pointer",
    fontSize: "14px",
  },
};