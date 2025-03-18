import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const howToUseSteps = [
  {
    title: "Wear The Pad",
    description: "Secure the pad inside your underwear for a comfortable fit.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnckXOoaQr30wqLb9hdpxub_fXFtDPbKNl4A&s",
  },
  {
    title: "Soak & Wash With Cold Water & Soap",
    description: "After use, rinse the pad with cold water and mild soap.",
    image: "https://img.icons8.com/?size=100&id=u9HtXJQWqxok&format=png&color=000000",
  },
  {
    title: "Dry In Direct Sunlight",
    description: "Let the pad dry under direct sunlight for proper hygiene.",
    image: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  },
  {
    title: "Reuse!",
    description: "Once dry, your pad is ready to be used again.",
    image: "https://img.icons8.com/?size=100&id=4oScoO7pBMcB&format=png&color=000000",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const HowToUseSection = () => {
  return (
    <section className="py-24 bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Simple <span className="text-purple-600">Steps to Use</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Using our reusable pads is easy and convenient. Follow these simple steps.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {howToUseSteps.map((step, index) => (
            <motion.div key={index} variants={fadeIn} className="relative">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center h-full flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="mb-6 mt-4">
                  <img src={step.image} alt={step.title} className="w-16 h-16 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>

              {index < howToUseSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 -translate-x-1/2 text-purple-300">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowToUseSection;
