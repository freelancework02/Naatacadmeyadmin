import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Layout from "../../../component/Layout";
import { Link } from "react-router-dom";

const KalamSubmission = () => {
  const [kalams, setKalams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchKalams();
  }, []);

  const fetchKalams = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://updated-naatacademy.onrender.com/api/kalamssub");
      setKalams(response.data);
    } catch (err) {
      setError("Failed to fetch kalam submissions");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    const exportData = kalams.map(
      ({
        id,
        name,
        email,
        whatsapp,
        city,
        country,
        poet_name,
        poet_book,
        poet_intro,
        kalam_title,
        genre,
        language,
        kalam_bahr,
        kalam,
        created_at,
        updated_at,
        Approved,
      }) => ({
        ID: id,
        Name: name,
        Email: email,
        Whatsapp: whatsapp,
        City: city,
        Country: country,
        Poet_Name: poet_name,
        Poet_Book: poet_book || "",
        Poet_Intro: poet_intro || "",
        Kalam_Title: kalam_title,
        Genre: genre,
        Language: language,
        Kalam_Bahr: kalam_bahr || "",
        Kalam: kalam,
        Created_At: new Date(created_at).toLocaleString(),
        Updated_At: new Date(updated_at).toLocaleString(),
        Approved: Approved === 1 ? "No" : "Yes",
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "KalamSubmissions");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, "kalam_submissions.xlsx");
  };

  if (loading) return <p style={styles.loading}>Loading data...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>Kalam Submissions Dashboard</h2>
        <button style={styles.exportBtn} onClick={exportToExcel} title="Export to Excel">
          Export to Excel
        </button>

        <div style={styles.tableWrapper}>
          <table style={styles.table} aria-label="Kalam Submissions Table">
            <thead style={styles.thead}>
              <tr>
                <th style={{ ...styles.th, width: "60px" }}>ID</th>
                <th style={{ ...styles.th, minWidth: "140px", fontFamily: "'Gulzar', serif" }}>Name</th>
                <th style={{ ...styles.th, minWidth: "180px" }}>Email</th>
                <th style={{ ...styles.th, width: "110px" }}>Whatsapp</th>
                <th style={{ ...styles.th, width: "110px" }}>City</th>
                <th style={{ ...styles.th, width: "110px" }}>Country</th>
                <th style={{ ...styles.th, minWidth: "160px", fontFamily: "'Gulzar', serif" }}>Poet Name</th>
                <th style={{ ...styles.th, minWidth: "130px", fontFamily: "'Gulzar', serif" }}>Poet Book</th>
                <th style={{ ...styles.th, minWidth: "160px", fontFamily: "'Gulzar', serif" }}>Poet Intro</th>
                <th style={{ ...styles.th, minWidth: "150px", fontFamily: "'Gulzar', serif" }}>Kalam Title</th>
                <th style={{ ...styles.th, width: "90px" }}>Genre</th>
                <th style={{ ...styles.th, width: "90px" }}>Language</th>
                <th style={{ ...styles.th, minWidth: "110px", fontFamily: "'Gulzar', serif" }}>Kalam Bahr</th>
                <th style={{ ...styles.th, minWidth: "300px", fontFamily: "'Gulzar', serif" }}>Kalam</th>
                <th style={{ ...styles.th, minWidth: "140px" }}>Created At</th>
                <th style={{ ...styles.th, minWidth: "140px" }}>Updated At</th>
                <th style={{ ...styles.th, width: "80px" }}>Approved</th>
                <th style={{ ...styles.th, width: "80px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {kalams.length > 0 ? (
                kalams.map((kalam) => (
                  <tr key={kalam.id} style={styles.tr}>
                    <td style={styles.td}>{kalam.id}</td>
                    <td style={{ ...styles.td, fontFamily: "'Gulzar', serif" }}>{kalam.name}</td>
                    <td style={styles.td}>{kalam.email}</td>
                    <td style={styles.td}>{kalam.whatsapp}</td>
                    <td style={styles.td}>{kalam.city}</td>
                    <td style={styles.td}>{kalam.country}</td>
                    <td style={{ ...styles.td, fontFamily: "'Gulzar', serif" }}>{kalam.poet_name}</td>
                    <td style={{ ...styles.td, fontFamily: "'Gulzar', serif" }}>{kalam.poet_book || "-"}</td>
                    <td style={{ ...styles.td, fontFamily: "'Gulzar', serif" }}>{kalam.poet_intro || "-"}</td>
                    <td style={{ ...styles.td, fontFamily: "'Gulzar', serif" }}>{kalam.kalam_title}</td>
                    <td style={styles.td}>{kalam.genre}</td>
                    <td style={styles.td}>{kalam.language}</td>
                    <td style={{ ...styles.td, fontFamily: "'Gulzar', serif" }}>{kalam.kalam_bahr || "-"}</td>
                    <td
                      style={{
                        ...styles.td,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "300px",
                        fontFamily: "'Gulzar', serif",
                      }}
                      title={kalam.kalam}
                    >
                      {kalam.kalam}
                    </td>
                    <td style={styles.td}>{new Date(kalam.created_at).toLocaleString()}</td>
                    <td style={styles.td}>{new Date(kalam.updated_at).toLocaleString()}</td>
                    <td style={styles.td}>{kalam.Approved === 1 ? "No" : "Yes"}</td>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <Link to={`/kalamsub/${kalam.id}`} style={styles.viewBtn}>
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="18" style={styles.noData}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: "15px",
    color: "#2c3e50",
    fontSize: "1.8rem",
    fontWeight: "600",
  },
  exportBtn: {
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "15px",
    fontSize: "1rem",
    boxShadow: "0 2px 8px rgba(39, 174, 96, 0.4)",
    transition: "background-color 0.3s ease",
  },
  tableWrapper: {
    overflowX: "auto",
    borderRadius: "8px",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1300px",
  },
  thead: {
    backgroundColor: "#2980b9",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  th: {
    padding: "12px 10px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.95rem",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "10px 10px",
    border: "1px solid #ddd",
    verticalAlign: "top",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tr: {
    backgroundColor: "#fff",
    transition: "background-color 0.2s ease",
  },
  noData: {
    padding: "20px",
    textAlign: "center",
    fontSize: "1rem",
    color: "#888",
  },
  loading: {
    padding: "20px",
    fontSize: "1.1rem",
    color: "#555",
  },
  error: {
    padding: "20px",
    fontSize: "1.1rem",
    color: "red",
  },
  viewBtn: {
    backgroundColor: "#2980b9",
    color: "#fff",
    padding: "5px 12px",
    borderRadius: "4px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
    boxShadow: "0 1px 5px rgba(41, 128, 185, 0.6)",
    display: "inline-block",
    transition: "background-color 0.3s ease",
  },
};

const addRowHoverEffect = () => {
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    tbody tr:hover {
      background-color: #f0f8ff;
    }
    a:hover {
      background-color: #1b5f91;
    }
  `;
  document.head.appendChild(style);
};

addRowHoverEffect();

export default KalamSubmission;
