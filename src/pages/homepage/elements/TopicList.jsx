import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../../component/Layout";
import { Type, FileText, Save, AlertCircle, Hash, Layers } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";

// Font configuration
const Font = Quill.import("formats/font");
Font.whitelist = [
  "sans-serif",
  "serif",
  "monospace",
  "Amiri",
  "Rubik-Bold",
  "Rubik-Light",
  "Scheherazade-Regular",
  "Scheherazade-Bold",
  "Aslam",
  "Mehr-Nastaliq",
];
Quill.register(Font, true);

const modules = {
  toolbar: [
    [{ font: Font.whitelist }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "align",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "clean",
];

function Field({ label, icon, children, required, error }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        {icon}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default function CreateCategory() {
  const [formData, setFormData] = useState({
    Name: "",
    Slug: "",
    Color: "#5a6c17",
    GroupID: "",
    GroupName: "",
    Description: "",
  });

  const [groups, setGroups] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch groups for dropdown
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("https://updated-naatacademy.onrender.com/api/groups");
        // Transform the data to ensure consistent property names
        const transformedGroups = response.data.map(group => ({
          ...group,
          GroupID: group.GroupID || group._id,
          GroupName: group.GroupName || group.Name
        }));
        console.log("Transformed groups:", transformedGroups);
        setGroups(transformedGroups);
      } catch (error) {
        console.error("Error fetching groups:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch groups. Please refresh the page.",
        });
      }
    };
    fetchGroups();
  }, []);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-generate slug when name changes
      if (name === 'Name') {
        newData.Slug = generateSlug(value);
      }
      
      // Update GroupName when GroupID changes
      if (name === 'GroupID' && value) {
        const selectedGroup = groups.find(g => g.GroupID === value);
        if (selectedGroup) {
          console.log("Selected group:", selectedGroup);
          newData.GroupID = selectedGroup.GroupID;
          newData.GroupName = selectedGroup.GroupName;
          console.log("Updated form data:", newData);
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.Name.trim()) newErrors.Name = "Name is required";
    if (!formData.Slug.trim()) newErrors.Slug = "Slug is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the payload
      const payload = {
        Name: formData.Name.trim(),
        Slug: formData.Slug.trim(),
        Color: formData.Color,
        GroupID: formData.GroupID || null,
        GroupName: formData.GroupName || null,
        Description: formData.Description || null
      };

      console.log("Sending payload:", payload);

      const response = await axios.post("https://updated-naatacademy.onrender.com/api/categories", payload);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Category created successfully!",
          timer: 2000,
          showConfirmButton: false
        });

        // Reset form
        setFormData({
          Name: "",
          Slug: "",
          Color: "#5a6c17",
          GroupID: "",
          GroupName: "",
          Description: "",
        });
      }
    } catch (error) {
      console.error("Error creating category:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create category",
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <span>&gt;</span>
            <Link to="/viewcategory" className="hover:text-foreground">
              Categories
            </Link>
            <span>&gt;</span>
            <span className="text-foreground">Create Category</span>
          </nav>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Type className="w-6 h-6" />
                  Create New Category
                </h1>
                <p className="text-green-100 mt-1">
                  Add a new category to organize your content
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field
                    label="Category Name"
                    icon={<Type className="w-4 h-4" />}
                    required
                    error={errors.Name}
                  >
                    <input
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      disabled={isSubmitting}
                    />
                  </Field>

                  <Field
                    label="Slug"
                    icon={<Hash className="w-4 h-4" />}
                    required
                    error={errors.Slug}
                  >
                    <input
                      type="text"
                      name="Slug"
                      value={formData.Slug}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                      disabled={isSubmitting}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Color" icon={<Type className="w-4 h-4" />}>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        name="Color"
                        value={formData.Color}
                        onChange={handleChange}
                        className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        disabled={isSubmitting}
                      />
                      <span className="text-gray-700 font-mono">
                        {formData.Color}
                      </span>
                    </div>
                  </Field>

                  <Field 
                  label="Group" 
                  icon={<Layers className="w-4 h-4" />}
                >
                  <select
                    name="GroupID"
                    value={formData.GroupID}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    disabled={isSubmitting}
                  >
                    <option value="">Select Group</option>
                    {groups.map(group => (
                      <option 
                        key={group.GroupID} 
                        value={group.GroupID}
                      >
                        {group.GroupName}
                      </option>
                    ))}
                  </select>
                  {/* Debug display */}
                  {formData.GroupID && (
                    <p className="text-sm text-gray-500 mt-1">
                      Selected Group: {formData.GroupName}
                    </p>
                  )}
                </Field>
                </div>

                <Field
                  label="Description"
                  icon={<FileText className="w-4 h-4" />}
                >
                  <ReactQuill
                    theme="snow"
                    value={formData.Description}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, Description: value }))
                    }
                    modules={modules}
                    formats={formats}
                    className="bg-white border rounded-lg min-h-[200px]"
                    readOnly={isSubmitting}
                  />
                </Field>

                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      flex items-center gap-2 px-6 py-2 rounded-lg text-white
                      ${
                        isSubmitting
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 active:bg-green-800"
                      }
                      transition-all duration-200 ease-in-out
                      transform hover:scale-105 active:scale-100
                      shadow-md hover:shadow-lg
                    `}
                  >
                    <Save className="w-5 h-5" />
                    {isSubmitting ? "Creating..." : "Create Category"}
                  </button>
                </div>
              </form>
            </div>

            {/* Help Card */}
            <div className="mt-6 bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Tips for Creating Categories
              </h2>
              <ul className="space-y-2 text-green-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Choose a clear, descriptive name for easy identification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  The slug is automatically generated but can be customized
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Use colors to visually distinguish different categories
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
