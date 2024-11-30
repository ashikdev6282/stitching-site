import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'; // For animations
import { AiOutlineMail, AiOutlineUser, AiOutlineMessage } from 'react-icons/ai';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.warn('Please fill out all fields.');
      return;
    }

    setLoading(true);

    try {
      // Simulate form submission (replace with API call)
      setTimeout(() => {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error('There was an error submitting your message.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-600 via-yellow-500 to-black-500 py-12 px-6">
      <ToastContainer />

      {/* Contact Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <motion.div
          className="text-center py-12 bg-gradient-to-r from-yellow-600 to-gray-500 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="text-4xl font-bold uppercase">Get in Touch</h1>
          <p className="mt-3 text-lg">
            We'd love to hear from you! Fill out the form below to get started.
          </p>
        </motion.div>

        {/* Form and Contact Info */}
        <div className="flex flex-col md:flex-row">
          {/* Form */}
          <motion.div
            className="w-full md:w-2/3 p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700 flex items-center gap-2"
                >
                  <AiOutlineUser className="text-blue-500" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700 flex items-center gap-2"
                >
                  <AiOutlineMail className="text-blue-500" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-lg font-medium text-gray-700 flex items-center gap-2"
                >
                  <AiOutlineMessage className="text-blue-500" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded-lg shadow-lg transition ${
                  loading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-yellow-600'
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="w-full md:w-1/3 bg-gradient-to-r from-yellow-600 to-gray-500 text-white p-8 flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className="text-lg mb-4">📧 Email: contact@example.com</p>
            <p className="text-lg mb-4">📞 Phone: +123 456 7890</p>
            <p className="text-lg">📍 Address: 123 Main Street, City, Country</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
