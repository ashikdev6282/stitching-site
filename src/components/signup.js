import React, { useState } from "react";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firbaseconfig"; // Ensure this is correct
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Signup = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be 10 digits")
            .required("Phone number is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log("Form submitted with values:", values);

                // Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
                console.log("User created successfully:", userCredential);

                // Store user details in Firestore
                if (userCredential.user && userCredential.user.uid) {
                    console.log("Storing user details for UID:", userCredential.user.uid);
                    await setDoc(doc(db, "Users", userCredential.user.uid), {
                        username: values.username,
                        email: values.email,
                        phone: values.phone,
                    });
                    console.log("User details stored successfully.");
                    
                    // Redirect to login page after successful signup
                    navigate("/login");
                    toast.success("User Registered Successfully!", { position: "top-center" });
                } else {
                    console.error("User UID not found.");
                    toast.error("Failed to create user details. Please try again.", { position: "top-center" });
                }
            } catch (error) {
                console.error("Error creating user or storing details:", error);
                toast.error("An error occurred. Please try again.", { position: "top-center" });
            }
        },
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
            <motion.div
                className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Left Section */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-700 items-center justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1555421689-43cad7100750?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU4fHxzdWl0c3xlbnwwfHwwfHx8MA%3D%3D"
                        alt="Signup Illustration"
                        className="max-w-full max-h-full object-cover"
                    />
                </div>

                {/* Right Section */}
                <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative">
                    <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Signup</h3>

                    {/* Username Field */}
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className="text-red-500 text-sm">{formik.errors.username}</div>
                        )}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        )}
                    </motion.div>

                    {/* Phone Field */}
                    <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                        )}
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                        className="mb-4 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 mt-[10px] transform -translate-y-1/2 focus:outline-none"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? (
                                <AiFillEyeInvisible className="text-gray-600 text-xl" />
                            ) : (
                                <AiFillEye className="text-gray-600 text-xl" />
                            )}
                        </button>
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-sm">{formik.errors.password}</div>
                        )}
                    </motion.div>

                    {/* Confirm Password Field */}
                    <motion.div
                        className="mb-6 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            name="confirmPassword"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 mt-[10px] transform -translate-y-1/2 focus:outline-none"
                            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        >
                            {isConfirmPasswordVisible ? (
                                <AiFillEyeInvisible className="text-gray-600 text-xl" />
                            ) : (
                                <AiFillEye className="text-gray-600 text-xl" />
                            )}
                        </button>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                        )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={formik.handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        
                    >
                        Sign Up
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
