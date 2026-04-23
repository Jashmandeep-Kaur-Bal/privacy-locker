import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Fetch files
  const fetchFiles = async () => {
    try {
      const res = await API.get("/files");
      setFiles(res.data);
    } catch (err) {
      alert("Error fetching files");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Upload file
  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/files/upload", formData);
      alert("Upload successful");
      setFile(null); // clear selection
      fetchFiles();
    } catch {
      alert("Upload failed");
    }
  };

  // Download file (FIXED)
  const handleDownload = async (id, filename) => {
    try {
      const res = await API.get(`/files/download/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;

      // ✅ Correct filename + extension
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Download failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 Privacy Locker</h2>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>

        {/* Upload Section */}
        <div style={styles.uploadBox}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button style={styles.button} onClick={handleUpload}>
            Upload
          </button>
        </div>

        {/* File List */}
        <h3>Your Files</h3>

        {files.length === 0 ? (
          <p>No files uploaded</p>
        ) : (
          files.map((f) => (
            <div key={f._id} style={styles.fileRow}>
              <span>{f.filename}</span>
              <button
                style={styles.download}
                onClick={() => handleDownload(f._id, f.filename)} // ✅ FIX
              >
                Download
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* 🎨 Styles */
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },

  uploadBox: {
    display: "flex",
    gap: "10px",
  },

  button: {
    padding: "8px 12px",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  logout: {
    alignSelf: "flex-end",
    padding: "6px 10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  fileRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    borderBottom: "1px solid #eee",
  },

  download: {
    padding: "5px 10px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};