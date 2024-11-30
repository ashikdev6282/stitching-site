import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../config/firbaseconfig";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";  // Import for React Router v6

const EditProfile = () => {
  const [form, setForm] = useState({ username: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();  // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Temporarily show the uploaded image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, "Users", user.uid);
        await updateDoc(userDoc, form);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1564568979181-0b86b0f1f2b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1aXRzfGVufDB8fDB8fHww')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      
      <motion.div
        className="relative bg-gradient-to-r from-yellow-300 to-white rounded-3xl shadow-lg p-10 w-full max-w-lg z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {/* Back Button */}
        <div className="text-left mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}  // Navigate back to the previous page
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            &larr; Back
          </button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-900">Edit Profile</h2>
          <p className="text-gray-500 mt-2">Update your information below</p>
        </div>

        {/* Tilt Effect Card */}
        <Tilt
          className="rounded-3xl bg-gray-50 shadow-inner p-6"
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          transitionSpeed={1500}
        >
          {/* Profile Picture Section */}
          <motion.div
            className="flex justify-center mb-8 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-24 h-24">
              <img
                src={avatar || "https://via.placeholder.com/150"}
                alt="Profile Avatar"
                className="rounded-full w-full h-full object-cover shadow-lg border-4 border-gray-200"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-indigo-700 transition"
              >
                <i className="fas fa-camera"></i>
              </label>
              <input
                id="avatarUpload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          </motion.div>

          {/* Form Section */}
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </motion.div>

            {/* Phone Field */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className={`w-full py-3 mt-4 text-white rounded-lg ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition-all`}
              disabled={loading}
              whileHover={{ scale: !loading ? 1.03 : 1 }}
              whileTap={{ scale: !loading ? 0.97 : 1 }}
            >
              {loading ? "Updating..." : "Update Profile"}
            </motion.button>
          </form>
        </Tilt>
      </motion.div>
    </div>
  );
};

export default EditProfile;
