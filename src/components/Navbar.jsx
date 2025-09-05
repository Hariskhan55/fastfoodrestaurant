import React, { useState } from 'react';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          FastFood Express
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/menu" className="hover:underline">Menu</Link>
          <Link to="/cart" className="hover:underline flex items-center gap-1">
            <FaShoppingCart /> Cart
          </Link>
          <Link to="/orders" className="hover:underline">Orders</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
        </div>

        {/* Mobile Toggle Button */}
        <button onClick={toggleMenu} className="md:hidden text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-700 px-4 pb-4 space-y-3">
          <Link to="/" onClick={toggleMenu} className="block">Home</Link>
          <Link to="/menu" onClick={toggleMenu} className="block">Menu</Link>
          <Link to="/cart" onClick={toggleMenu} className="block">Cart</Link>
          <Link to="/orders" onClick={toggleMenu} className="block">Orders</Link>
          <Link to="/admin" onClick={toggleMenu} className="block">Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
