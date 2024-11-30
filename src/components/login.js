import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firbaseconfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Check if user exists in Firestore
      const userDoc = doc(db, "Users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        console.log("User data:", userSnapshot.data());
        navigate("/home"); // Navigate to profile if user is found
      } else {
        setError("User not found. Redirecting to registration...");
        setTimeout(() => {
          navigate("/signup"); // Navigate to register after 2 seconds
        }, 2000);
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {/* Card */}
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-3xl overflow-hidden w-full max-w-4xl">
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-500 to-indigo-700 items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1669207261271-a0041d4b0948?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHN1aXRzfGVufDB8fDB8fHww"
            alt="Stitching Site"
            className="max-w-full max-h-full object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.523 0-10-4.477-10-10s4.477-10 10-10c5.523 0 10 4.477 10 10 0 1.306-.249 2.564-.7 3.725M15 10h-.01M9 10h.01M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10h.01M9 10h.01M3.98 8.05a10.05 10.05 0 0018.02 0M10 6.25c0-.692.378-1.296.982-1.618M9 10a1 1 0 00-1-1m8 0a1 1 0 001-1M5.637 13.302A8.993 8.993 0 013 9.055"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </form>
          <p className="text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-500 cursor-pointer"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
