import React, { useState, useEffect } from 'react';
import AppointmentPopup from './appointmentpopup';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firbaseconfig';
import { motion } from 'framer-motion'; // Import motion for animations

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Control popup visibility
  const [disabledDates, setDisabledDates] = useState([]); // Store disabled dates

  const days = Array.from({ length: 30 }, (_, i) => i + 1); // Generate days of the month (November 2024)

  // Fetch disabled dates (fully booked dates) from Firebase
  useEffect(() => {
    const fetchDisabledDates = async () => {
      const appointmentsRef = collection(db, 'appointments');
      const snapshot = await getDocs(appointmentsRef);

      // Extract dates that are fully booked
      const fetchedDisabledDates = snapshot.docs
        .map((doc) => doc.data())
        .filter((appointment) => appointment.isFull) // Filter fully booked dates
        .map((appointment) => parseInt(appointment.date.split('-')[2])); // Extract day part of the date (e.g., '2024-11-05' -> 5)

      setDisabledDates(fetchedDisabledDates);
    };

    fetchDisabledDates();
  }, []);

  // Handle date selection
  const handleDateClick = (day) => {
    if (!disabledDates.includes(day)) {
      setSelectedDate(day);
      setIsPopupOpen(true); // Open the popup when a date is selected
    } else {
      alert('This date is fully booked!');
    }
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <motion.div
      className="flex flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl font-bold mb-4">November 2024</h2>

      {/* Calendar Grid */}
      <motion.div
        className="grid grid-cols-7 gap-4 w-full max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {days.map((day) => (
          <motion.div
            key={day}
            className={`p-4 border border-gray-300 rounded-md text-center cursor-pointer transition ${
              disabledDates.includes(day)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' // Disabled dates
                : 'bg-gray-100 hover:bg-yellow-400 hover:text-white' // Available dates
            }`}
            onClick={() => handleDateClick(day)} // Trigger popup on click
            whileHover={{ scale: 1.1 }} // Slightly enlarge the date on hover
            whileTap={{ scale: 0.95 }} // Slightly shrink on click
          >
            {day}
          </motion.div>
        ))}
      </motion.div>

      {/* Appointment Popup */}
      {isPopupOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AppointmentPopup
            date={selectedDate} // Pass selected date to the popup
            onClose={closePopup} // Close the popup handler
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Appointment;
