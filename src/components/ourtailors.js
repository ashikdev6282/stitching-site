import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firbaseconfig";
import { delay, motion } from "framer-motion";

const TailorsSection = () => {
  const [tailors, setTailors] = useState([]);

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Tailors"));
        const tailorsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTailors(tailorsList);
      } catch (error) {
        console.error("Error fetching tailors: ", error);
      }
    };

    fetchTailors();
  }, []);

  // Mapping social icon names to Font Awesome class names
  const iconMap = {
    facebook: "fab fa-facebook",
    twitter: "fab fa-twitter",
    instagram: "fab fa-instagram",
    linkedin: "fab fa-linkedin",
    youtube: "fab fa-youtube",
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const backgroundAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 2, delay: 0.8 },
    },
  };

  return (
    <motion.section
      className="py-12 bg-gray-50 mt-12 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1559204260-9d9f024ab30a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHN1aXRzfGVufDB8fDB8fHww')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "50px",
      }}
      initial="hidden"
      animate="visible"
      variants={backgroundAnimation}
    >
      <div className="absolute inset-0 bg-black opacity-30" />
      <motion.div
        className="mx-auto text-center relative z-10"
        variants={containerVariants}
      >
        {/* Page Title */}
        <motion.h2
          className="text-4xl font-bold text-yellow-500 mb-12 font-sans uppercase"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", letterSpacing: "2px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Meet Our Tailors
        </motion.h2>

        {/* Tailor Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10"
          variants={containerVariants}
        >
          {tailors.map((tailor, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-between max-w-xs mx-auto w-full transform transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-2xl opacity-90 hover:opacity-100"
              style={{ minHeight: "380px" }}
              variants={itemVariants}
            >
              {/* Profile Image */}
              <motion.div
                className="w-60 h-60 overflow-hidden rounded-full mb-6 transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-75"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src={tailor.image || "https://via.placeholder.com/150"}
                  alt={tailor.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Name and Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{tailor.name}</h3>
              <p className="text-sm text-gray-600">{tailor.title}</p>

              {/* Social Links */}
              <motion.div
                className="flex space-x-6 mt-6"
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {tailor.social?.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={`https://${social}.com`}
                    className="text-gray-600 text-2xl hover:text-indigo-600 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                  >
                    <i className={iconMap[social] || "fab fa-default"} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default TailorsSection;
