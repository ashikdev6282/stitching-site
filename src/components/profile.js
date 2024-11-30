import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firbaseconfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = doc(db, "Users", currentUser.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUser({
              username: userData.username || "Anonymous User",
              email: currentUser.email,
              phone: userData.phone || "Not Set",
            });
          } else {
            setUser({
              username: "Anonymous User",
              email: currentUser.email,
              phone: "Not Set",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // If no user is logged in, redirect to login
        navigate("/login", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/login", { replace: true }); // Redirect to the login page
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <motion.div
          className="text-white text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Loading Profile...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-500 to-black-900 flex justify-center items-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-4xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Profile Section with 3D Tilt */}
          <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.3}>
            <motion.div
              className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-indigo-500"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <img
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </Tilt>

          {/* User Details Section */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.username}</h2>
            <p className="text-gray-600">
              Email: <span className="font-semibold">{user.email}</span>
            </p>
            <p className="text-gray-600">
              Phone: <span className="font-semibold">{user.phone}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons with Animations */}
        <motion.div
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20}>
            <motion.button
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition"
              onClick={() => navigate("/editprofile")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </motion.button>
          </Tilt>

          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20}>
            <motion.button
              className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition"
              onClick={() => navigate("/changepassword")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Password
            </motion.button>
          </Tilt>

          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20}>
            <motion.button
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition"
              onClick={() => navigate("/myorders")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              My Orders
            </motion.button>
          </Tilt>

          <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20}>
            <motion.button
              className="w-full bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition"
              onClick={handleLogout} // Updated to call handleLogout
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </Tilt>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
