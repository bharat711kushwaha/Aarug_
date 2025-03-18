import { useEffect, useState } from 'react';
import { ArrowRight, Leaf, DollarSign, Smile, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getProducts } from '../api';
import toast from 'react-hot-toast';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import BenefitsSection from './BenefitsSection';
import HowToUseSection from './UseSection';

// Constants for reuse
const COLORS = {
  primary: '#8E44AD', // Purple
  secondary: '#F39C12', // Orange
  accent: '#2ECC71', // Green
  light: '#F9F9F9',
  dark: '#333333',
};

export const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { products, setProducts } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter products for the "For Women" section
  const womenProducts = products.slice(0, 4); // Display first 4 products

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Demo videos
  const videos = [
    {
      title: "How to Wash Pad",
      url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/c9f7b9a8c9.mp4",
      thumbnail: "https://media.gettyimages.com/id/1394998424/photo/reusable-cloth-menstrual-pads.jpg?s=612x612&w=0&k=20&c=tLZWLgU_eM1wMn1dxQ56O8cWmfwSgwDJj9y2a8lynWA="
    },
    {
      title: "How to Use Sanitary Pad",
      url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/133d7240c1.mp4",
      thumbnail: "https://media.gettyimages.com/id/1320884348/photo/closeup-of-woman-hands-holding-white-sanitary-pad.jpg?s=612x612&w=0&k=20&c=PxZIHEYGjuWMqW6ipyto7Jqlxy2XeN2HH9kxhOXXjFA="
    },
    {
      title: "Cloth vs Reusable Pad",
      url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/b71584dfc3.mp4",
      thumbnail: "https://media.gettyimages.com/id/1405202282/photo/handmade-ecological-menstrual-pad-in-hand.jpg?s=612x612&w=0&k=20&c=-VG-7kyVSMYibGBuGkA7uL3vuCpAmRddbBPAyaGVhPQ="
    },
  ];

  

  const faqData = [
    // 🌸 Periods Related Questions
    {
      question: "How long does a normal period last?",
      answer: "A typical menstrual cycle lasts between 3 to 7 days.",
    },
    {
      question: "What causes irregular periods?",
      answer: "Irregular periods can be caused by stress, diet, hormonal imbalance, or medical conditions like PCOS.",
    },
    {
      question: "Can I exercise during my period?",
      answer: "Yes! Light exercises like yoga and walking can help reduce cramps and improve mood.",
    },
    {
      question: "Are menstrual cramps normal?",
      answer: "Mild to moderate cramps are normal, but severe pain might require medical attention.",
    },
    // 🩸 Reusable Pads Related Questions
    {
      question: "How do I clean reusable sanitary pads?",
      answer: "Rinse with cold water after use, wash with mild soap, and air dry in direct sunlight.",
    },
    {
      question: "How long do reusable pads last?",
      answer: "With proper care, reusable pads can last up to 3-5 years.",
    },
    {
      question: "Are reusable pads hygienic?",
      answer: "Yes! When washed and dried properly, reusable pads are completely hygienic and safe to use.",
    },
    {
      question: "Can I use reusable pads for heavy flow?",
      answer: "Yes, reusable pads come in different absorbencies for light, medium, and heavy flow.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      
<HeroSection/>
      {/* Benefits Section */}

<BenefitsSection/>
     {/* Products Section */}
     <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Shop <span className="text-purple-600">Premium Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For a wholesome period experience, minus rashes and cramps!
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-solid"></div>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {womenProducts.map((product, index) => (
                <motion.div key={product.id} variants={fadeIn}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800 transition duration-300"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How To Use Section */}
    
<HowToUseSection/>
      {/* Video Tutorials Section */}
      <section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Watch <span className="text-purple-600">How It Works</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        See our reusable pads in action with these helpful video tutorials.
      </p>
    </motion.div>

    <motion.div 
      className="grid md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {videos.map((video, index) => (
        <motion.div 
          key={index} 
          className="group"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative">
              {/* Fix: Add "playsInline" and "muted" to avoid autoplay issues */}
              <video 
                poster={video.thumbnail}
                controls
                playsInline
                muted
                className="w-full h-64 object-cover cursor-pointer"
              >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{video.title}</h3>
              <p className="text-gray-600">
                Learn the proper techniques for getting the most out of your reusable pads.
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-b from-purple-900 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-yellow-300">Mission</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              We're committed to providing sustainable period care solutions that benefit both people and the planet.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Comfort",
                description: "We design our products with your comfort in mind, using soft, breathable fabrics that feel great against your skin.",
                image: "https://media.istockphoto.com/id/629943292/photo/mother-and-daughter-shopping-sanitary-pad.jpg?s=1024x1024&w=is&k=20&c=apshDAOkIFEq5TmACfMnsgXYfLOS7I4dV0TgfYIqy4k=",
                icon: "💆‍♀️"
              },
              {
                title: "Empowerment",
                description: "We empower women through education and access to safe, reliable, and affordable menstrual products.",
                image: "https://media.istockphoto.com/id/2164587275/video/indian-mother-giving-sanitary-pad-to-her-daughter-education-womens-health-problem.jpg?s=640x640&k=20&c=kK2ECKfQy4jurTcQrmgazKEruV4qlAU4TyBgyhyNA2U=",
                icon: "💪"
              },
              {
                title: "Sustainability",
                description: "We're committed to reducing waste and environmental impact through our reusable, eco-friendly products.",
                image: "https://img.freepik.com/premium-photo/personal-hygiene_1048944-29257426.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid",
                icon: "🌱"
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="group"
              >
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden h-full transition-all duration-300 hover:bg-opacity-20 hover:scale-105">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-2">{item.icon}</span>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-gray-900">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

{/* Testimonials Section */}
<section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our <span className="text-purple-600">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of satisfied customers have made the switch to our reusable pads.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8 items-center">
            {/* Left Section - Overall Stats */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Satisfaction</h3>
                
                <div className="space-y-6">
                  {/* Star Rating */}
                  <div className="flex items-center">
                    <div className="flex space-x-1 text-yellow-500 text-2xl">
                      {'★★★★★'.split('').map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                    <span className="ml-2 text-lg font-bold text-gray-700">
                      4.9/5
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-purple-600">12,500+</span>
                    <span className="ml-2 text-lg text-gray-700">Satisfied Customers</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-4xl font-bold text-green-600">95%</span>
                    <span className="ml-2 text-lg text-gray-700">Would Recommend</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Section - Customer Reviews */}
            <motion.div 
              className="md:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Priya Sharma',
                    review: 'These pads are amazing! They are so comfortable and easy to use. I love that they are eco-friendly too!',
                    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    stars: 5,
                  },
                  {
                    name: 'Neha Patel',
                    review: 'I was skeptical at first, but these pads have completely changed my period experience. No more rashes!',
                    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    stars: 5,
                  },
                  {
                    name: 'Anjali Mehra',
                    review: 'Switching to EcoPads was the best decision I made this year. Good for me and the environment!',
                    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    stars: 4,
                  },
                  {
                    name: 'Riya Gupta',
                    review: 'These pads are super absorbent and easy to wash. The quality is excellent and they last a long time.',
                    image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                    stars: 5,
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="group"
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                        />
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                          <div className="flex text-yellow-500">
                            {'★'.repeat(testimonial.stars)}
                            {'☆'.repeat(5 - testimonial.stars)}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.review}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked <span className="text-purple-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our products and menstrual health.
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left p-5 focus:outline-none bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  {openIndex === index ? 
                    <ChevronUp className="h-5 w-5 text-purple-600" /> : 
                    <ChevronDown className="h-5 w-5 text-purple-600" />
                  }
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 pt-0 bg-purple-50">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay <span className="text-yellow-300">Updated</span>
              </h2>
              <p className="text-xl text-purple-100">
                Join our newsletter for tips, offers, and updates on sustainable period care.
              </p>
            </div>
            
            <div className="md:w-1/2 w-full">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300"
                >
                  Subscribe
                </motion.button>
              </form>
              <p className="text-sm text-purple-200 mt-4 text-center sm:text-left">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-12 text-white text-center shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make the <span className="text-yellow-300">Switch</span>?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of women who have chosen sustainable, comfortable period care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/products"
                  className="inline-block px-8 py-4 bg-white text-purple-800 font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300"
                >
                  Shop Now
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/about"
                  className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-800 transition duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;