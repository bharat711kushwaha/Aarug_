import React from "react";
import { motion } from "framer-motion";
import { Leaf, DollarSign, Smile } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  image: string;
  icon: JSX.Element;
  color: string;
}

const features: Feature[] = [
  {
    title: "Eco-Friendly",
    description:
      "Made from sustainable materials, each pad saves hundreds of disposables from landfills.",
    image:
      "https://www.shutterstock.com/shutterstock/photos/2164271075/display_1500/stock-photo-zero-waste-periods-kit-eco-friendly-feminine-hygiene-reuse-concept-reusable-sanitary-pads-for-2164271075.jpg",
    icon: <Leaf className="h-8 w-8 text-green-500" />,
    color: "green",
  },
  {
    title: "Cost-Effective",
    description:
      "Save up to 90% on period care costs over 3 years while contributing to sustainability.",
    image:
      "https://m.media-amazon.com/images/I/61sibDMs4PL._AC_UF1000,1000_QL80_.jpg",
    icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
    color: "yellow",
  },
  {
    title: "Comfortable",
    description:
      "Designed with soft, breathable fabrics for maximum comfort and protection all day.",
    image:
      "https://i.pinimg.com/474x/09/66/06/0966066c0eca64a0f23a976434458b73.jpg",
    icon: <Smile className="h-8 w-8 text-blue-500" />,
    color: "blue",
  },
];

const BenefitsSection: React.FC = () => {
  return (
    <section id="learn-more" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-purple-600">EcoPads?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our products combine comfort, sustainability, and affordability to
            provide you with the best period care experience.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
            >
              <div className={`h-2 bg-${feature.color}-500 w-full`}></div>
              <div className="relative">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-64 object-cover" // Ensures full cover
                />
                <div className={`absolute -bottom-8 left-6 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-${feature.color}-100`}>
                  {feature.icon}
                </div>
              </div>
              <div className="p-6 pt-12">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
