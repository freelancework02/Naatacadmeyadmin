import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../../component/Layout";

const KalamSubDetail  = () => {
  const { id } = useParams();
  const [kalam, setKalam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchKalam();
  }, [id]);

  const fetchKalam = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://updated-naatacademy.onrender.com/api/kalamssub/${id}`);
      setKalam(response.data);
    } catch (err) {
      setError("Failed to fetch kalam details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;
  if (!kalam) return <p style={styles.error}>No Kalam found with this ID</p>;

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>{kalam.kalam_title}</h2>
        <div style={styles.detailsGrid}>
          <div><strong>Name:</strong> {kalam.name}</div>
          <div><strong>Email:</strong> {kalam.email}</div>
          <div><strong>Whatsapp:</strong> {kalam.whatsapp}</div>
          <div><strong>City:</strong> {kalam.city}</div>
          <div><strong>Country:</strong> {kalam.country}</div>
          <div><strong>Poet Name:</strong> {kalam.poet_name}</div>
          <div><strong>Poet Book:</strong> {kalam.poet_book || "-"}</div>
          <div><strong>Poet Intro:</strong> {kalam.poet_intro || "-"}</div>
          <div><strong>Genre:</strong> {kalam.genre}</div>
          <div><strong>Language:</strong> {kalam.language}</div>
          <div><strong>Kalam Bahr:</strong> {kalam.kalam_bahr || "-"}</div>
          <div><strong>Approved:</strong> {kalam.Approved === 1 ? "Yes" : "No"}</div>
          <div><strong>Created At:</strong> {new Date(kalam.created_at).toLocaleString()}</div>
          <div><strong>Updated At:</strong> {new Date(kalam.updated_at).toLocaleString()}</div>
        </div>
        <section style={styles.kalamSection}>
          <h3>Kalam:</h3>
          <pre style={styles.kalamText}>{kalam.kalam}</pre>
        </section>
        <Link to="/kalamsub" style={styles.backLink}>
          ← Back to Dashboard
        </Link>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
  },
  title: {
    color: "#2c3e50",
    marginBottom: "20px",
    fontSize: "2rem",
    fontWeight: "700",
    textAlign: "center",
    fontFamily:"gulzar"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 30px",
    fontSize: "1rem",
    color: "#34495e",
    marginBottom: "20px",
    fontFamily:"gulzar"
  },
  kalamSection: {
    backgroundColor: "#f9f9f9",
    padding: "15px 20px",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  kalamText: {
    whiteSpace: "pre-wrap",
    fontSize: "1.1rem",
    lineHeight: "2.6",
    color: "#2c3e50",
    fontFamily:"gulzar"
  },
  backLink: {
    display: "inline-block",
    textDecoration: "none",
    color: "#2980b9",
    fontWeight: "600",
    fontSize: "1rem",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "1px solid #2980b9",
    transition: "background-color 0.3s ease",
  },
  loading: {
    padding: "20px",
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center",
  },
  error: {
    padding: "20px",
    fontSize: "1.2rem",
    color: "red",
    textAlign: "center",
  },
};

export default KalamSubDetail ;
