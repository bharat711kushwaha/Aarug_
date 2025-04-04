import React, { useEffect } from "react";
import { Leaf, Recycle, Heart, Users, Mail, MapPin, Phone } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import images from your assets folder
import heroBackground from "../assets/ceo.jpg";
import aboutImage from "../assets/ceo.jpg";
import whatWeDoImage from "../assets/ceo.jpg";
import journeyBackground from "../assets/ceo.jpg";
import teamImage from "../assets/team.jpg";
import ceoImage from "../assets/ceo.jpg";
import coFounderImage from "../assets/ceo.jpg";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-white overflow-hidden">
      {/* Hero Banner with Background Image */}
      <div 
        className="relative h-60 sm:h-80 w-full bg-cover bg-center flex items-center justify-center" 
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-emerald-900 opacity-60"></div>
        <div className="relative z-10 text-center text-white px-4" data-aos="fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        
        {/* Our Mission */}
        <div className="text-center mb-16 sm:mb-24" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6">Our Mission</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl text-emerald-700 max-w-3xl mx-auto px-2">
            Aarug is dedicated to revolutionizing menstrual care by providing sustainable, 
            eco-friendly products that empower women while protecting our planet.
          </p>
        </div>

        {/* About Us Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 mb-16 sm:mb-32">
          <div className="w-full md:w-1/2" data-aos="fade-right">
            <img 
              src={aboutImage}
              alt="About Aarug" 
              className="rounded-lg shadow-xl w-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0" data-aos="fade-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6">About Aarug</h2>
            <div className="w-16 h-1 bg-yellow-400 mb-6 sm:mb-8"></div>
            <p className="text-emerald-700 mb-4">
              Aarug was born from a vision to create sustainable menstrual products that are both 
              kind to the environment and comfortable for users. We believe that menstrual care 
              should not come at the cost of our planet's health.
            </p>
            <p className="text-emerald-700 mb-4">
              Our products are designed with sustainability in mind, using organic materials that 
              are biodegradable and reusable, reducing waste and environmental impact.
            </p>
            <p className="text-emerald-700">
              We're committed to making eco-friendly menstrual care accessible to all, 
              promoting both individual comfort and environmental responsibility.
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-6 sm:gap-10 mb-16 sm:mb-32">
          <div className="w-full md:w-1/2 mt-6 md:mt-0" data-aos="fade-right">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6">What We Do</h2>
            <div className="w-16 h-1 bg-yellow-400 mb-6 sm:mb-8"></div>
            <p className="text-emerald-700 mb-4">
              At Aarug, we design and manufacture high-quality, reusable menstrual products that 
              are both comfortable and environmentally friendly. Our product range includes:
            </p>
            <ul className="text-emerald-700 mb-4 space-y-3">
              <li className="flex items-start">
                <Leaf className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                <span>Reusable menstrual pads made from organic cotton</span>
              </li>
              <li className="flex items-start">
                <Leaf className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                <span>Eco-friendly menstrual cups crafted from medical-grade silicone</span>
              </li>
              <li className="flex items-start">
                <Leaf className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                <span>Biodegradable tampons and pads for those who prefer disposable options</span>
              </li>
              <li className="flex items-start">
                <Leaf className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                <span>Educational resources on sustainable menstrual practices</span>
              </li>
            </ul>
            <p className="text-emerald-700">
              We also actively work to break the stigma around menstruation through education and 
              community outreach programs.
            </p>
          </div>
          <div className="w-full md:w-1/2" data-aos="fade-left">
            <img 
              src={whatWeDoImage}
              alt="What We Do" 
              className="rounded-lg shadow-xl w-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Our Journey Section with Background */}
        <div className="relative py-12 sm:py-24 mb-16 sm:mb-32">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 rounded-xl" 
            style={{ backgroundImage: `url(${journeyBackground})` }}
          ></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6" data-aos="zoom-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6">Our Journey</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6 sm:mb-8"></div>
            <p className="text-xl sm:text-2xl text-emerald-700 mb-6 sm:mb-8 italic font-serif">
              "It all began with a shovel and digging a hole…"
            </p>
            <p className="text-emerald-700 mb-4">
              Our journey started when our founders recognized the environmental impact of disposable 
              menstrual products. They began researching sustainable alternatives, experimenting with 
              materials and designs to create products that were both eco-friendly and comfortable.
            </p>
            <p className="text-emerald-700 mb-4">
              Like planting a seed, they dug deep into the problem and nurtured their solution with 
              care and dedication. From humble beginnings in a small workshop, Aarug has grown into 
              a thriving company committed to environmental stewardship and women's health.
            </p>
            <p className="text-emerald-700">
              Today, we continue to innovate and expand our product line, always staying true to our 
              foundational values of sustainability, comfort, and accessibility.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16 sm:mb-32">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6 text-center" data-aos="fade-up">Our Core Values</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8 sm:mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            
            {/* Eco-Sisterhood */}
            <div 
              className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 sm:p-8 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2" 
              data-aos="fade-right"
            >
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="h-8 w-8 text-emerald-800" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-emerald-800 mb-4 text-center">Eco-Sisterhood</h3>
              <p className="text-emerald-700 mb-4">
                We believe in fostering a community of women who support each other and the planet. 
                Our eco-sisterhood is built on shared values of environmental responsibility and 
                mutual respect.
              </p>
              <p className="text-emerald-700">
                By choosing sustainable menstrual products, our customers join a global movement of 
                women taking steps to protect our environment while taking care of their bodies.
              </p>
            </div>
            
            {/* Connection to Earth */}
            <div 
              className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 sm:p-8 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2" 
              data-aos="fade-left"
            >
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Heart className="h-8 w-8 text-emerald-800" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-emerald-800 mb-4 text-center">Connection to Earth</h3>
              <p className="text-emerald-700 mb-4">
                We honor the deep connection between women's bodies and the natural world. Our products 
                are designed to respect this connection, using materials that come from and return to 
                the earth without harm.
              </p>
              <p className="text-emerald-700">
                By choosing Aarug, you're participating in a cycle of sustainability that benefits 
                both your body and the planet we all share.
              </p>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 mb-16 sm:mb-32">
          <div className="w-full md:w-1/2" data-aos="fade-right">
            <img 
              src={teamImage}
              alt="Our Team" 
              className="rounded-xl shadow-xl w-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0" data-aos="fade-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6">Meet Our Team</h2>
            <div className="w-16 h-1 bg-yellow-400 mb-6 sm:mb-8"></div>
            <p className="text-emerald-700 mb-4">
              Our team is made up of passionate individuals committed to making a difference in 
              women's lives and for our planet. With diverse backgrounds in sustainability, design, 
              and women's health, we bring a holistic approach to menstrual care.
            </p>
            <p className="text-emerald-700 mb-4">
              Each member of our team contributes unique skills and perspectives, united by our 
              shared vision of creating sustainable, comfortable menstrual products.
            </p>
            <p className="text-emerald-700">
              We work collaboratively, constantly innovating and improving our products based on 
              customer feedback and the latest research in sustainable materials.
            </p>
          </div>
        </div>

        {/* Founders Section */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 sm:p-12 shadow-xl mb-16 sm:mb-24" data-aos="zoom-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6 text-center">Our Founders</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8 sm:mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            
            {/* CEO */}
            <div 
              className="bg-white rounded-xl p-6 sm:p-8 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2" 
              data-aos="fade-right" data-aos-delay="100"
            >
              <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 md:gap-6">
                <img
                  src={ceoImage}
                  alt="Vinita Patel"
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow-md border-4 border-yellow-400"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-emerald-800">Vinita Patel</h3>
                  <p className="text-yellow-500 font-medium mb-2 sm:mb-3">Founder & CEO</p>
                  <p className="text-emerald-700">
                    Passionate about sustainability and women's health, Vinita founded Aarug with 
                    a vision to revolutionize menstrual care through eco-friendly solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Co-Founder */}
            <div 
              className="bg-white rounded-xl p-6 sm:p-8 shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2" 
              data-aos="fade-left" data-aos-delay="100"
            >
              <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 md:gap-6">
                <img
                  src={coFounderImage}
                  alt="Praksha"
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full shadow-md border-4 border-yellow-400"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-emerald-800">Praksha</h3>
                  <p className="text-yellow-500 font-medium mb-2 sm:mb-3">Co-Founder & COO</p>
                  <p className="text-emerald-700">
                    With expertise in operations and product development, Praksha ensures Aarug 
                    delivers high-quality, innovative products while maintaining our commitment 
                    to sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl p-6 sm:p-12 shadow-xl" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-4 sm:mb-6 text-center">Contact Us</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            {/* Address */}
            <div 
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2" 
              data-aos="fade-up" data-aos-delay="100"
            >
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-800" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-2">Our Location</h3>
              <p className="text-emerald-700">GGU College Startup Center, Chhattisgarh, India</p>
            </div>

            {/* Email */}
            <div 
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              data-aos="fade-up" data-aos-delay="200"
            >
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-800" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-2">Email Us</h3>
              <p className="text-emerald-700 break-all">support@aarug.com</p>
            </div>

            {/* Phone */}
            <div 
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 sm:col-span-2 md:col-span-1"
              data-aos="fade-up" data-aos-delay="300"
            >
              <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-800" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-emerald-800 mb-2">Call Us</h3>
              <p className="text-emerald-700">+91 9111361052</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
