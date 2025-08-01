import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import Layout from "../../../component/Layout";
import {
  Users,
  FileText,
  Save,
  AlertCircle,
  Info,
  Upload,
  ArrowLeft
} from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Quill Configuration
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"]
  ]
};

const formats = [
  "font", "header",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "script", "align",
  "list", "bullet", "indent",
  "link", "image"
];

// Field Component
function Field({ label, icon, children, required, helpText }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium mb-2 flex items-center gap-2">
        {icon}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {helpText && (
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Info className="w-4 h-4" />
          {helpText}
        </p>
      )}
    </div>
  );
}

export default function EditGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch group data
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://updated-naatacademy.onrender.com/api/groups/${id}`);
        const group = response.data;
        
        setGroupName(group.GroupName || "");
        setGroupDescription(group.GroupDescription || "");
        
        if (group.GroupImageURL) {
          setExistingImage(group.GroupImageURL);
          setImagePreview(group.GroupImageURL);
        }
        
      } catch (error) {
        console.error("Error fetching group:", error);
        setError("Failed to load group data");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load group data. Please try again.",
        }).then(() => {
          navigate('/groups');
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(file);
      setExistingImage(null); // Clear existing image when new one is selected
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Field",
        text: "Group name is required.",
      });
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("GroupName", groupName.trim());
      formData.append("GroupDescription", groupDescription || "");
      if (groupImage) {
        formData.append("image", groupImage);
      }

      const response = await axios.put(
        `https://updated-naatacademy.onrender.com/api/groups/${id}`, 
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Group updated successfully!",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate('/viewgroup');
        });
      } else {
        throw new Error(response.data.message || "Failed to update group");
      }
    } catch (err) {
      console.error("Error updating group:", err);
      const errMsg = err.response?.data?.message || "Failed to update group. Please try again.";
      setError(errMsg);
      Swal.fire({ icon: "error", title: "Error", text: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading group data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-6">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>&gt;</span>
            <Link to="/viewgroup" className="hover:text-foreground">Groups</Link>
            <span>&gt;</span>
            <span className="text-foreground">Edit Group</span>
          </nav>

          {/* Form Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Edit Group
                </h1>
                <p className="text-purple-100 mt-1">Update group details</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <Field
                  label="Group Name"
                  icon={<Users className="w-4 h-4" />}
                  required
                  helpText="Choose a unique and descriptive name for your group"
                >
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                    disabled={isSubmitting}
                  />
                </Field>

                <Field
                  label="Description"
                  icon={<FileText className="w-4 h-4" />}
                  helpText="Provide additional details about the group's purpose"
                >
                  <div className="border rounded-lg overflow-hidden">
                    <ReactQuill
                      value={groupDescription}
                      onChange={setGroupDescription}
                      modules={modules}
                      formats={formats}
                      theme="snow"
                      placeholder="Enter group description (optional)"
                      readOnly={isSubmitting}
                      className="bg-white"
                      style={{ height: "200px" }}
                    />
                  </div>
                </Field>

                <Field
                  label="Group Image"
                  icon={<Upload className="w-4 h-4" />}
                  helpText="Upload an image for the group (optional)"
                >
                  <div className="space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                      disabled={isSubmitting}
                    />
                    {(imagePreview || existingImage) && (
                      <div className="mt-2">
                        <img
                          src={imagePreview || existingImage}
                          alt="Preview"
                          className="max-w-xs rounded-lg border border-gray-200"
                        />
                        {existingImage && !imagePreview && (
                          <p className="text-sm text-gray-500 mt-1">
                            Current group image
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </Field>

                <div className="flex justify-end pt-4 gap-4">
                  <button
                    type="button"
                    onClick={() => navigate('/groups')}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white ${
                      isSubmitting
                        ? "bg-purple-400 cursor-not-allowed"
                        : "bg-purple-600 hover:bg-purple-700"
                    } transition-all duration-200 transform hover:scale-105 active:scale-100 shadow-md hover:shadow-lg`}
                  >
                    <Save className="w-5 h-5" />
                    {isSubmitting ? "Updating..." : "Update Group"}
                  </button>
                </div>
              </form>
            </div>

            {/* Help Card */}
            <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-purple-700 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Editing Tips
              </h2>
              <ul className="space-y-2 text-purple-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Clear names help users find content more easily
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Detailed descriptions improve content discoverability
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                  Images should be relevant and high-quality
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}