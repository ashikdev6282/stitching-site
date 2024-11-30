import React from "react";
import { motion } from "framer-motion";

function AboutSection() {
  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <section className="relative py-16 px-6 lg:px-24 bg-gradient-to-br from-gray-100 via-white to-gray-100">
      {/* Background Shape */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="bg-orange-100 absolute top-0 right-0 w-1/3 h-1/2 rounded-bl-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="relative container mx-auto">
        {/* Main Card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition duration-300"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Image Section */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                alt="Tailoring Workspace"
                className="rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            {/* Right Content Section */}
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Header */}
              <h2 className="text-4xl font-extrabold text-gray-800 mb-6 leading-snug">
                About{" "}
                <span className="text-orange-600 underline decoration-wavy">
                  Peter Mason Tailoring
                </span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                With over a decade of experience, Peter Mason Custom Tailors
                provides exquisite designs tailored to perfection. Our
                dedication to quality craftsmanship and exceptional service
                makes us the trusted name in custom stitching.
              </p>

              {/* Highlights Section */}
              <div className="space-y-6">
                {/* Highlight 1 */}
                <motion.div
                  className="flex items-start gap-4 group"
                  variants={highlightVariants}
                  custom={0}
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3068/3068670.png"
                    alt="Experience Icon"
                    className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                      10+ Years of Experience
                    </h3>
                    <p className="text-gray-600">
                      Delivering expertise in crafting custom garments with
                      unmatched quality.
                    </p>
                  </div>
                </motion.div>

                {/* Highlight 2 */}
                <motion.div
                  className="flex items-start gap-4 group"
                  variants={highlightVariants}
                  custom={1}
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                    alt="Satisfied Customers Icon"
                    className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                      5000+ Satisfied Customers
                    </h3>
                    <p className="text-gray-600">
                      Trusted by thousands for impeccable tailoring services.
                    </p>
                  </div>
                </motion.div>

                {/* Highlight 3 */}
                <motion.div
                  className="flex items-start gap-4 group"
                  variants={highlightVariants}
                  custom={2}
                  initial="hidden"
                  animate="visible"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2820/2820705.png"
                    alt="Tailoring Icon"
                    className="w-12 h-12 transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                      Specializing in Men’s & Women’s Custom Tailoring
                    </h3>
                    <p className="text-gray-600">
                      Tailoring elegance and style for every occasion.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
