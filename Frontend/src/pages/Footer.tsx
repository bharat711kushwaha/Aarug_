import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"; // ✅ React Icons for Social Media

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Footer Grid */}
        <div className="grid md:grid-cols-4 gap-8">

          {/* About Aarug */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Aarug</h3>
            <p className="text-sm text-gray-400">
              Aarug is a startup incubated at GGU College Startup Center, dedicated to providing sustainable and eco-friendly menstrual products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/products" className="hover:text-white">Our Products</a></li>
              <li><a href="/faq" className="hover:text-white">FAQs</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm text-gray-400">📍 GGU College Startup Center, Chhattisgarh, India</p>
            <p className="text-sm text-gray-400">📧 support@aarug.com</p>
            <p className="text-sm text-gray-400">📞 +91 9876543210</p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-2xl">
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <FaLinkedin />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Aarug. All rights reserved.</p>
          <p>Incubated at <span className="text-white font-semibold">GGU College Startup Center</span></p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
