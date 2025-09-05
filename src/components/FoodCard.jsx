import React from 'react';
import { FaPlus } from 'react-icons/fa';

const FoodCard = ({ food, addToCart }) => {
  const { id, name, price, image, description, category } = food;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={image || '/Image/default-food.jpg'} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            ${price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
            {category}
          </span>
          
          <button 
            onClick={() => addToCart(food)} 
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
            aria-label="Add to cart"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;