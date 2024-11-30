import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firbaseconfig'; // Ensure Firebase config is correct
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    const user = auth.currentUser;

    if (user) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen text-gray-800">
      {/* Hero Section */}
      <header className="relative h-screen bg-yellow-600 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute bg-yellow-500 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"
            style={{ top: '30%', left: '50%' }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, 50, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
          <motion.div
            className="absolute bg-yellow-400 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"
            style={{ bottom: '10%', right: '15%' }}
            animate={{
              x: [0, -30, 30, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover Your Perfect Fit
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Custom stitching, seamless designs, and tailored perfection just for you.
          </motion.p>
          <motion.button
            onClick={handleGetStartedClick}
            className="px-8 py-3 bg-white text-yellow-600 font-bold rounded-lg hover:bg-yellow-700 hover:text-yellow-500 transition-transform transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-600 mb-10">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Tailored Perfection',
              description: 'Precision stitching for a perfect fit every time.',
              icon: '🎯',
            },
            {
              title: 'Premium Materials',
              description: 'We use only the finest fabrics for your outfits.',
              icon: '🧵',
            },
            {
              title: 'Fast Turnaround',
              description: 'Get your custom designs completed in no time.',
              icon: '⚡',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      {/* Showcase Section */}
<section className="py-16 px-6 bg-gray-200">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-600 mb-10">
    Our Creations
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      {
        id: 1,
        title: 'Elegant Dress',
        description: 'Crafted with premium materials for any occasion.',
        image: 'https://plus.unsplash.com/premium_photo-1683133553448-4484a17fa6d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHN1aXRzJTIwZm9yJTIwc2FsZXxlbnwwfHwwfHx8MA%3D%3D', // Replace with your image path
      },
      {
        id: 2,
        title: 'Casual Fit',
        description: 'Relaxed, stylish, and tailored for your comfort.',
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VpdHMlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D', // Replace with your image path
      },
      {
        id: 3,
        title: 'Classic Suit',
        description: 'Perfectly tailored suits for formal events.',
        image: 'https://plus.unsplash.com/premium_photo-1664298280363-51c8881ce9ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxjbGFzc2ljJTIwc3VpdHxlbnwwfHwwfHx8MA%3D%3D', // Replace with your image path
      },
    ].map((item) => (
      <motion.div
        key={item.id}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* Call to Action */}
      <footer className="bg-yellow-600 text-white text-center py-10">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Start Your Journey Today
        </motion.h2>
        <motion.button
          onClick={handleGetStartedClick}
          className="px-8 py-3 bg-white text-yellow-600 font-bold rounded-lg hover:bg-yellow-700 hover:text-yellow-500 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </footer>
    </div>
  );
};

export default LandingPage;
