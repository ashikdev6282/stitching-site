import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firbaseconfig"; // Update with your Firebase config file path
import { motion } from "framer-motion"; // Import framer-motion

const ReadyToWear = () => {
  const [suits, setSuits] = useState([]);

  useEffect(() => {
    const fetchSuits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Suits"));
        const suitsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSuits(suitsData);
      } catch (error) {
        console.error("Error fetching suits: ", error);
      }
    };

    fetchSuits();
  }, []);

  return (
    <motion.section
      className="py-16 bg-gray-50 mt-12"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "50px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center mb-12">
        {/* Heading */}
        <motion.h2
          className="text-4xl font-bold uppercase text-yellow-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Ready To Wear
        </motion.h2>
        {/* Subheading */}
        <motion.p
          className="text-sm uppercase tracking-wide text-white font-semibold mb-4 text-yellow-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Online Store
        </motion.p>
      </div>

      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {suits.map((suit, index) => (
            <motion.div
              key={suit.id}
              className="bg-white shadow-md rounded-lg overflow-hidden text-center hover:shadow-lg transition duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }} // Staggered effect
            >
              {/* Image */}
              <motion.img
                src={suit.image || "https://via.placeholder.com/300x400"} // Fallback image
                alt={suit.title}
                className="w-full h-96 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Title and Price */}
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{suit.title}</h3>
                <p className="text-sm font-medium text-gray-500 mt-2">{suit.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ReadyToWear;
