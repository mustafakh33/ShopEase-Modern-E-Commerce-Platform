import { useState } from 'react';
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-indigo-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Shop<span className="text-purple-400">Ease</span>
            </h2>
            <p className="text-gray-400 mb-4">
              Your destination for high-quality products, irresistible offers, and exceptional customer service.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-purple-400" />
                <span className="text-gray-300">123 Shopping Street, Riyadh, Saudi Arabia</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-purple-400" />
                <a href="tel:+966112345678" className="text-gray-300 hover:text-white">+966 11 234 5678</a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-purple-400" />
                <a href="mailto:info@shopease.com" className="text-gray-300 hover:text-white">info@shopease.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-white">Quick Links</h5>
            <ul className="space-y-3">
              {['Home', 'All Products', 'Categories', 'Brands', 'Account', 'Orders'].map((label, index) => (
                <li key={index} className="transform transition-transform hover:translate-x-2">
                  <a href="/" className="text-gray-300 hover:text-white">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-white">Customer Support</h5>
            <ul className="space-y-3">
              {['FAQ', 'Shipping Info', 'Return Policy', 'Track Order', 'Size Guide', 'Contact Us'].map((label, index) => (
                <li key={index} className="transform transition-transform hover:translate-x-2">
                  <a href="/" className="text-gray-300 hover:text-white">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-xl font-bold mb-4 text-white">Stay Updated</h5>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive deals and product updates.
            </p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-l-md focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-r-md"
              >
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex justify-center gap-4">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
              <a key={index} href="/" className="text-gray-400 hover:text-white text-xl">
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-4">
            © {currentYear} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
""
