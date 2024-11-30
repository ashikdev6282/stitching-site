import React, { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../config/firbaseconfig";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";  // Importing Heroicons
import { useNavigate } from "react-router-dom";  // Import for React Router v6

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    // State to toggle password visibility
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Using useNavigate for React Router v6
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous error message
        setError("");

        // Validate inputs
        if (!currentPassword || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        // Check if the new password and confirm password match
        if (password !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        // Validate password strength (minimum length 6 characters for example)
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        try {
            setLoading(true);
            const user = auth.currentUser;

            if (user) {
                // Reauthenticate user to change password
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);

                // Update password
                await updatePassword(user, password);
                toast.success("Password updated successfully!");
            } else {
                setError("User not logged in.");
            }
        } catch (error) {
            setError("Error changing password: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-yellow-600 via-yellow-500 to-black-500">
            <motion.form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center justify-between mb-6">
                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}  // Navigate back to the previous page
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                        &larr; Back
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight">Change Password</h2>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 text-red-600 text-sm font-medium">{error}</div>
                )}

                {/* Current Password Input */}
                <motion.div
                    className="mb-6"
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 25 }}
                >
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <div className="relative">
                        <motion.input
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-transform transform hover:scale-105"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showCurrentPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* New Password Input */}
                <motion.div
                    className="mb-6"
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.8 }}
                >
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative">
                        <motion.input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform transform hover:scale-105"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Confirm New Password Input */}
                <motion.div
                    className="mb-6"
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.8 }}
                >
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <div className="relative">
                        <motion.input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform transform hover:scale-105"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? (
                                <EyeOffIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className={`w-full py-3 bg-red-600 text-white rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"}`}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                >
                    {loading ? "Updating..." : "Update Password"}
                </motion.button>
            </motion.form>
        </div>
    );
};

export default ChangePassword;
