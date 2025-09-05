import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">FastFood Express</h2>
          <p>Delicious bites at your doorstep. Fresh, fast, and flavorful!</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/menu" className="hover:underline">Menu</a></li>
            <li><a href="/cart" className="hover:underline">Cart</a></li>
            <li><a href="/orders" className="hover:underline">Orders</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> 123 Food Street, Flavor Town</li>
            <li className="flex items-center gap-2"><FaPhone /> +92 300 1234567</li>
            <li className="flex items-center gap-2"><FaEnvelope /> support@fastfood.com</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
          </div>
        </div>

      </div>

      <div className="mt-8 border-t border-white/30 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} FastFood Express. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
