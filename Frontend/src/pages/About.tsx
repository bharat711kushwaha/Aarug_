import React from "react";
import { Leaf, Recycle, Heart, Users, Mail, MapPin, Phone } from "lucide-react";
import teamImage from "../assets/team.jpg"; // ✅ Correct Import
import ceoImage from "../assets/aarug.jpg"; // ✅ Correct Import
import coFounderImage from "../assets/aarug.jpg"; // ✅ Correct Import

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* About Aarug Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">About Aarug</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Aarug is a startup dedicated to providing sustainable and eco-friendly menstrual products.  
            Our mission is to revolutionize menstrual care by offering reusable, comfortable, and environmentally safe solutions.
          </p>
        </div>

        {/* Company Features */}
        <div className="grid md:grid-cols-3 gap-12 mb-16 animate-slide-up">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
            <p className="text-gray-600">
              Made from sustainable materials, reducing environmental impact.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Recycle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Reusable</h3>
            <p className="text-gray-600">
              Designed for multiple uses, reducing waste and saving money.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comfortable</h3>
            <p className="text-gray-600">
              Made with premium materials for maximum comfort and protection.
            </p>
          </div>
        </div>

        {/* CEO & Co-Founder Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            {/* CEO */}
            <div className="text-center">
              <img
                src={ceoImage} // ✅ Using imported image
                alt="CEO"
                className="w-32 h-32 object-cover rounded-full mx-auto shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">Vinita patel</h3>
              <p className="text-gray-500">Founder & CEO</p>
              <p className="text-gray-600 mt-2">
                Passionate about sustainability, Rahul founded Aarug to create eco-friendly menstrual solutions.
              </p>
            </div>

            {/* Co-Founder */}
            <div className="text-center">
              <img
                src={coFounderImage} // ✅ Using imported image
                alt="Co-Founder"
                className="w-32 h-32 object-cover rounded-full mx-auto shadow-md"
              />
              <h3 className="text-xl font-semibold mt-4">Sneha Verma</h3>
              <p className="text-gray-500">Co-Founder & COO</p>
              <p className="text-gray-600 mt-2">
                Sneha leads operations and innovation, ensuring Aarug delivers high-quality products.
              </p>
            </div>

          </div>
        </div>

        {/* Our Team Section */}
        <div className="bg-green-50 rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center animate-slide-up">Our Amazing Team</h2>

          {/* Group Photo */}
          <div className="flex justify-center my-6">
            <img src={teamImage} alt="Aarug Team" className="w-full max-w-3xl rounded-lg shadow-md" />
          </div>

          {/* Team Praise */}
          <div className="text-center">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our dedicated team is constantly innovating to provide high-quality, sustainable, and comfortable menstrual products for everyone.
            </p>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in">Contact Us</h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">

            {/* Address */}
            <div>
              <MapPin className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Our Location</h3>
              <p className="text-gray-500">GGU College Startup Center, Chhattisgarh, India</p>
            </div>

            {/* Email */}
            <div>
              <Mail className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Email Us</h3>
              <p className="text-gray-500">support@aarug.com</p>
            </div>

            {/* Phone */}
            <div>
              <Phone className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p className="text-gray-500">+91 9111361052</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
