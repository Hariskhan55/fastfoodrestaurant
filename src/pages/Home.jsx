import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import FoodCard from '../components/FoodCard';
import foodItems from '../data/foodItems';


const Home = () => {
  const { addToCart } = useCart();
  
  // Get popular items for the featured section
  const popularItems = foodItems.filter(item => item.popular).slice(0, 4);
  
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="bg-cover bg-center h-100 px-10 flex items-center"
        style={{ backgroundImage: 'url("/Image/banner2.jpg")' }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-lg bg-white/80 backdrop-blur-sm p-6 rounded-lg">
            <h1 className="text-4xl font-bold text-red-600 mb-4">
              Delicious Food Delivered Fast
            </h1>
            <p className="text-gray-700 mb-6">
              Enjoy your favorite meals from the comfort of your home. 
              Quick delivery, hot and fresh food, and a wide variety of options.
            </p>
            <Link 
              to="/menu" 
              className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Items Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Popular Items</h2>
            <Link to="/menu" className="text-red-600 hover:underline font-medium">
              View Full Menu
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map(item => (
              <FoodCard 
                key={item.id} 
                food={item} 
                addToCart={addToCart} 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Browse Menu</h3>
              <p className="text-gray-600">
                Explore our wide variety of delicious meals, sides, and drinks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Add to Cart</h3>
              <p className="text-gray-600">
                Select your favorite items and customize your order.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Enjoy Your Food</h3>
              <p className="text-gray-600">
                Receive your order and enjoy your delicious meal!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-6 bg-red-600 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Satisfy your cravings with our delicious menu items. 
            Fast delivery, great taste, and excellent service guaranteed.
          </p>
          <Link 
            to="/menu" 
            className="bg-white text-red-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Order Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;