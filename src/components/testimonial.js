import React, { useState } from "react";
import { motion } from "framer-motion"; // Importing Framer Motion

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "Hi, I just wanted to let you know that I received the suit this week and I love it. It’s been beautifully made and every detail is perfect.",
      author: "Richard Romero",
    },
    {
      id: 2,
      quote:
        "I was amazed at how perfectly the outfit was tailored. The quality and precision are remarkable. Highly recommended!",
      author: "Sophia Harris",
    },
    {
      id: 3,
      quote:
        "The attention to detail and the craftsmanship are outstanding. Thank you for making me look so sharp at my event.",
      author: "James Carter",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Next Testimonial
  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  // Previous Testimonial
  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat py-16 px-6 mt-8"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1426523038054-a260f3ef5bc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk1fHxzdWl0c3xlbnwwfHwwfHx8MA%3D%3D')`, 
        borderRadius: "50px", // Replace with your background image
      }}
    >
      <div className="mx-auto text-center">
        {/* Testimonial Header */}
        <motion.h2
          className="text-4xl font-bold text-yellow-600 mb-12 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          What Our Client Says
        </motion.h2>

        {/* Quote Section */}
        <motion.div
          className="max-w-3xl mx-auto bg-transparent text-white transition-all duration-500 ease-in-out"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <p className="text-2xl italic mb-6">“{testimonials[current].quote}”</p>
          <p className="text-lg font-medium mt-6">— {testimonials[current].author}</p>
        </motion.div>

        {/* Navigation Arrows */}
        <motion.div
          className="absolute inset-y-0 left-6 flex items-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button
            className="p-2 text-white bg-gray-800 rounded-full hover:bg-gray-600 transition"
            onClick={prevTestimonial}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </motion.div>

        <motion.div
          className="absolute inset-y-0 right-6 flex items-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button
            className="p-2 text-white bg-gray-800 rounded-full hover:bg-gray-600 transition"
            onClick={nextTestimonial}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </motion.div>

        {/* Dots for Navigation */}
        <div className="mt-8 flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition ${
                current === index ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrent(index)}
              whileHover={{ scale: 1.2 }} // Dots scale on hover
              transition={{ duration: 0.8 }}
            ></motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
