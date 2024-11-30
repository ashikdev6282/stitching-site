import React, { useEffect, useState } from 'react';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firbaseconfig';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import framer-motion

const AppointmentPopup = ({ date, onClose }) => {
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // Fetch available appointments from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      const appointmentsRef = collection(db, 'appointments');
      const snapshot = await getDocs(appointmentsRef);
      const fetchedAppointments = snapshot.docs.map((doc) => doc.data());

      const defaultSlots = [
        '8:00 am - 9:00 am',
        '10:00 am - 11:00 am',
        '12:00 pm - 1:00 pm',
        '2:00 pm - 3:00 pm',
        '4:00 pm - 5:00 pm',
      ];

      const updatedSlots = defaultSlots.map((time) => ({
        time,
        status: fetchedAppointments.some(
          (appointment) => appointment.date === date && appointment.time === time
        )
          ? 'Unavailable'
          : 'Available',
      }));

      setAvailableAppointments(updatedSlots);
    };

    fetchAppointments();
  }, [date]);

  // Handle booking
  const handleBookAppointment = async (time) => {
    try {
      const appointmentId = `${date}-${time}`; // Unique ID for the appointment
      const appointmentRef = doc(db, 'appointments', appointmentId);

      // Save to Firestore
      await setDoc(appointmentRef, {
        date,
        time,
        status: 'Booked',
        userId: 'USER_ID', // Replace with authenticated user ID if you have authentication
      });

      alert('Appointment booked successfully!');
      onClose();
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book the appointment. Please try again.');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <h3 className="text-xl font-semibold mb-4">
          Available Appointments on November {date}, 2024
        </h3>
        <ul className="space-y-4">
          {availableAppointments.map((slot, index) => (
            <motion.li
              key={index}
              className="flex items-center justify-between border-b pb-2"
              whileHover={{ scale: 1.05 }} // Hover effect on slot
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span>{slot.time}</span>
              {slot.status === 'Available' ? (
                <motion.button
                  className="bg-yellow-400 text-white py-1 px-3 rounded-md hover:bg-yellow-500 transition"
                  onClick={() => handleBookAppointment(slot.time)}
                  whileTap={{ scale: 0.95 }} // Button tap effect
                >
                  Book Appointment
                </motion.button>
              ) : (
                <button
                  className="bg-gray-300 text-white py-1 px-3 rounded-md cursor-not-allowed"
                  disabled
                >
                  Unavailable
                </button>
              )}
            </motion.li>
          ))}
        </ul>
        <motion.button
          className="mt-4 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
          onClick={onClose}
          whileHover={{ scale: 1.05 }} // Hover effect on close button
          whileTap={{ scale: 0.95 }} // Button tap effect
        >
          Close
        </motion.button>
      </motion.div>
      <motion.button
        onClick={handleBack}
        className="back-button bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back
      </motion.button>
    </motion.div>
  );
};

export default AppointmentPopup;
