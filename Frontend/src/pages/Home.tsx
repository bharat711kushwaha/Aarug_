import  { useEffect , useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Leaf, DollarSign, Smile } from 'lucide-react';

import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getProducts } from '../api';
import toast from 'react-hot-toast';
import { ProductCard } from '../components/ProductCard';


const howToUseSteps = [
  {
    title: "Wear The Pad",
    description: "Secure the pad inside your underwear for a comfortable fit.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnckXOoaQr30wqLb9hdpxub_fXFtDPbKNl4A&s", // Replace with actual icon
  },
  {
    title: "Soak & Wash With Cold Water & Soap",
    description: "After use, rinse the pad with cold water and mild soap.",
    image: "https://img.icons8.com/?size=100&id=u9HtXJQWqxok&format=png&color=000000", // Replace with actual icon
  },
  {
    title: "Dry In Direct Sunlight",
    description: "Let the pad dry under direct sunlight for proper hygiene.",
    image: "https://cdn-icons-png.flaticon.com/512/869/869869.png", // Replace with actual icon
  },
  {
    title: "Reuse!",
    description: "Once dry, your pad is ready to be used again.",
    image: "https://img.icons8.com/?size=100&id=4oScoO7pBMcB&format=png&color=000000", // Replace with actual icon
  },
];
const videos = [
  {
    title: "How to Wash Pad",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/c9f7b9a8c9.mp4",
  },
  {
    title: "How to Use Sanitary Pad",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/133d7240c1.mp4",
  },
  {
    title: "Cloth vs Reusable Pad",
    url: "https://cdn.live2.ai/uploads/pv2x12vnez/video/transcoded/480p/b71584dfc3.mp4",
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
  {
    question: "Are reusable pads comfortable?",
    answer: "Yes! They are made from soft, breathable fabric that feels gentle on the skin.",
  },
];


  
export const Home = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const { products, setProducts } = useStore();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, [setProducts]);

  // Filter products for the "For Women" section
  const womenProducts = products.slice(0, 4); // Display first 4 products
  return (
    <div className="min-h-screen pt-16">
   {/* Hero Section */}
<div className="relative h-[600px] bg-cover bg-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
    {/* Left Side: Content */}
    <div className="text-white w-1/2 space-y-6 animate-fadeInLeft">
      <h1 className="text-4xl md:text-6xl font-bold">
        Sustainable Living Starts Here
      </h1>
      <p className="text-xl md:text-2xl">
        Reusable pads? Yes, it's possible! Comfortable, eco-friendly, and better for the planet.
      </p>
      <Link
        to="/products"
        className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition duration-300 inline-flex items-center gap-2 animate-bounce"
      >
        Get Started
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>

    {/* Right Side: Image */}
    <div className="w-1/2 flex justify-end animate-fadeInRight">
      <img
        src="https://media.istockphoto.com/id/1521121105/photo/young-indian-woman-educating-other-traditional-women-about-sanitary-pad-and-how-to-use-it.jpg?s=1024x1024&w=is&k=20&c=hZCesO-UEn3q5Gr04_FrE_MtUSMzBw3XpN6x2NbxQs8="
        alt="Reusable Pads"
        className="rounded-lg shadow-2xl w-3/4 h-[400px] object-cover transform hover:scale-105 transition-transform duration-300"
      />
    </div>
  </div>
</div>

{/* "For Women" Section */}
<div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">For Women</h2>
          <p className="text-xl text-gray-600 text-center mb-8">
            For a wholesome period experience, minus rashes 'n' cramps!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {womenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

{/* Features Section */}
<div className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
      Why Choose EcoPads?
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: 'Eco-Friendly',
          description:
            'Made from sustainable materials, reducing environmental impact',
          image:
            'https://www.shutterstock.com/shutterstock/photos/2164271075/display_1500/stock-photo-zero-waste-periods-kit-eco-friendly-feminine-hygiene-reuse-concept-reusable-sanitary-pads-for-2164271075.jpg',
          icon: <Leaf className="h-8 w-8 text-green-500" />, // Icon from lucide-react
        },
        {
          title: 'Cost-Effective',
          description:
            'Save money in the long run while contributing to sustainability',
          image:
            'https://img.freepik.com/free-vector/accounting-concept-illustration_114360-20539.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
          icon: <DollarSign className="h-8 w-8 text-yellow-500" />, // Icon from lucide-react
        },
        {
          title: 'Comfortable',
          description:
            'Designed for maximum comfort and protection throughout the day',
          image:
            'https://media.istockphoto.com/id/1491437090/photo/young-asian-woman-stomach-ache-sitting-on-bed-at-home-health-problem-inflammation-in-body.jpg?s=612x612&w=0&k=20&c=klJuXI8Dw5Rd1DJaoYX4b4SurSE-D_IcYTl6XXCwrvE=',
          icon: <Smile className="h-8 w-8 text-blue-500" />, // Icon from lucide-react
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
        >
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
              {feature.icon}
              <span className="ml-2">{feature.title}</span>
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* How to Use Section */}
      <div className="py-16 bg-[#F8F4F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          How To Use
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {howToUseSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Circular Icon Container */}
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-gray-700">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-2 text-sm max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How to Use - Demo Videos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">{video.title}</h3>
              <video controls className="w-full h-48 rounded-md">
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </div>
 {/* Mission Section */}
<div className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>

    {/* Responsive Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Mission Card 1 */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <img
          src="https://media.istockphoto.com/id/629943292/photo/mother-and-daughter-shopping-sanitary-pad.jpg?s=1024x1024&w=is&k=20&c=apshDAOkIFEq5TmACfMnsgXYfLOS7I4dV0TgfYIqy4k="
          alt="Comfort"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">Comfort</h3>
        <p className="text-gray-600">
          Our products are designed for maximum comfort and ease of use.
        </p>
      </div>

      {/* Mission Card 2 */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <img
          src="https://media.istockphoto.com/id/2164587275/video/indian-mother-giving-sanitary-pad-to-her-daughter-education-womens-health-problem.jpg?s=640x640&k=20&c=kK2ECKfQy4jurTcQrmgazKEruV4qlAU4TyBgyhyNA2U="
          alt="Empowerment"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
        <p className="text-gray-600">
          We empower women by providing safe and reliable menstrual products.
        </p>
      </div>

      {/* Mission Card 3 */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <img
          src="https://img.freepik.com/premium-photo/personal-hygiene_1048944-29257426.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
        <p className="text-gray-600">
          Our products are eco-friendly and designed for long-term use.
        </p>
      </div>

    </div>
  </div>
</div>

     {/* Testimonials Section */}
<div className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-12">
      What Our Customers Say
    </h2>

    {/* Two-Column Layout */}
    <div className="grid md:grid-cols-2 gap-12 items-center">
      
      {/* Left Section - Overall Stats */}
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h3 className="text-2xl font-semibold mb-4">Customer Satisfaction</h3>
        <div className="flex items-center justify-center mb-4">
          {/* Star Rating */}
          <div className="flex space-x-1 text-yellow-500 text-2xl">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i}>{star}</span>
            ))}
          </div>
          <span className="ml-2 text-lg font-semibold text-gray-700">
            4.9/5 (2,347 Reviews)
          </span>
        </div>
        
        {/* Pads Sold Count */}
        <p className="text-gray-600 text-lg">
          <span className="text-3xl font-bold text-green-600">12,500+</span>  
          {' '} EcoPads Sold!
        </p>
      </div>

      {/* Right Section - Customer Reviews */}
      <div className="grid md:grid-cols-2 gap-6">
        {[
          {
            name: 'John Doe',
            review:
              'EcoPads are amazing! They are comfortable, eco-friendly, and save me money.',
            image:
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            stars: 5,
          },
          {
            name: 'Jane Smith',
            review:
              'I love how soft and durable these pads are. Highly recommend them!',
            image:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            stars: 5,
          },
          {
            name: 'Alice Johnson',
            review:
              'Switching to EcoPads was the best decision for me and the planet.',
            image:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            stars: 4,
          },
          {
            name: 'Emma Wilson',
            review:
              'These pads are super absorbent and easy to wash. Love the quality!',
            image:
              'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            stars: 5,
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>

            {/* Star Rating */}
            <div className="flex justify-center text-yellow-500 text-xl mb-2">
              {'★'.repeat(testimonial.stars)}
              {'☆'.repeat(5 - testimonial.stars)}
            </div>

            <p className="text-gray-600">{testimonial.review}</p>
          </div>
        ))}
      </div>

    </div>
  </div>
</div>

      {/* // faq */}
    
       <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-lg font-semibold text-left py-4 focus:outline-none"
              >
                {faq.question}
                <span className="text-green-500">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <p className="text-gray-600 px-2 py-2 transition-all duration-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
      {/* Newsletter Section */}
      <div className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-xl mb-8">
            Get the latest updates, offers, and eco-friendly tips straight to your
            inbox.
          </p>
          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-64 p-3 rounded-l-md focus:outline-none text-gray-800"
            />
            <button
              type="submit"
              className="bg-green-700 px-6 py-3 rounded-r-md hover:bg-green-800 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

    
    </div>
  );
};