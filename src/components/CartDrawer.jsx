import React from 'react';
import { FaTimes, FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, closeCart, cartItems, updateQuantity, removeFromCart }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={closeCart}
      ></div>
      
      {/* Cart Panel */}
      <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl animate-slide-in-right">
        <div className="p-4 bg-red-600 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button 
            onClick={closeCart}
            className="p-1 hover:bg-red-700 rounded-full"
            aria-label="Close cart"
          >
            <FaTimes />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Your cart is empty</p>
            <button 
              onClick={closeCart}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {cartItems.map(item => (
                <div key={item.id} className="p-4 flex gap-3">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img 
                      src={item.image || '/Image/default-food.jpg'} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-red-600 font-bold">${item.price.toFixed(2)}</p>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <Link 
                to="/checkout" 
                onClick={closeCart}
                className="block w-full bg-red-600 text-white text-center py-3 rounded-md hover:bg-red-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;