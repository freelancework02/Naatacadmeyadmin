import React, { useState, useEffect } from "react";
import Layout from "../../../component/Layout";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTopic() {
  const [form, setForm] = useState({
    Title: "",
    CategoryID: "",
    CategoryName: "",
    Slug: "",
    GroupID: "",
    GroupName: "",
    Description: "",
    IsDeleted: 0,
  });

  const [categories, setCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // TopicID from URL

  useEffect(() => {
    // Fetch categories and groups
    axios.get("https://updated-naatacademy.onrender.com/api/categories")
      .then(res => setCategories(res.data))
      .catch(() => setCategories([]));
    
    axios.get("https://updated-naatacademy.onrender.com/api/groups")
      .then(res => setGroups(res.data))
      .catch(() => setGroups([]));

    // Fetch topic data
    axios.get(`https://updated-naatacademy.onrender.com/api/topics/${id}`)
      .then(res => {
        setForm(res.data);
      })
      .catch(err => {
        Swal.fire("Error", "Topic not found or fetch failed", "error");
        navigate(-1);
      });
  }, [id, navigate]);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setForm(f => ({
      ...f,
      Title: value,
      Slug: value
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => {
      let updated = { ...f, [name]: value };
      if (name === "CategoryID") {
        const selected = categories.find(c => String(c.CategoryID) === value);
        updated.CategoryName = selected ? selected.Name : "";
      }
      if (name === "GroupID") {
        const selected = groups.find(g => String(g.GroupID) === value);
        updated.GroupName = selected ? selected.GroupName : "";
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.Title || !form.CategoryID || !form.Slug) {
      Swal.fire("Missing Fields", "Title, Category, and Slug are required!", "warning");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(`https://updated-naatacademy.onrender.com/api/topics/${id}`, form);
      if (response.data.success) {
        Swal.fire("Success", "Topic updated successfully!", "success").then(() => {
          navigate(-1); // Redirect back
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Failed to update topic", "error");
    }
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded shadow"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold mb-8">Edit Topic</h1>
          <form onSubmit={handleSubmit} className="bg-slate-50 rounded-lg p-8 max-w-2xl mx-auto space-y-6 shadow">
            <div>
              <label className="block font-medium mb-1">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="Title"
                value={form.Title}
                onChange={handleTitleChange}
                className="w-full border rounded px-3 py-2"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Slug <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="Slug"
                value={form.Slug}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Category <span className="text-red-500">*</span></label>
              <select
                name="CategoryID"
                value={form.CategoryID}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
                disabled={isSubmitting}
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.CategoryID} value={cat.CategoryID}>{cat.Name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Group</label>
              <select
                name="GroupID"
                value={form.GroupID}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={isSubmitting}
              >
                <option value="">Select Group</option>
                {groups.map(group => (
                  <option key={group.GroupID} value={group.GroupID}>{group.GroupName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Description</label>
              <ReactQuill
                theme="snow"
                value={form.Description}
                onChange={val => setForm(f => ({ ...f, Description: val }))}
                className="bg-white"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`px-6 py-2 rounded bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Topic"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
