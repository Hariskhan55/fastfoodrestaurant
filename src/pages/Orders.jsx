import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatOrderDate, getStatusColor } from '../utils/cartUtils';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);
  
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };
  
  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="max-w-md mx-auto">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
          <Link 
            to="/menu" 
            className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>
            
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {orders.map(order => (
                <button
                  key={order.id}
                  onClick={() => handleOrderClick(order)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedOrder?.id === order.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">{formatOrderDate(order.date)}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · 
                    ${order.total.toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Order Details</h2>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Order #{selectedOrder.id} · {formatOrderDate(selectedOrder.date)}
                </p>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-3">Items</h3>
                <div className="divide-y">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="py-3 flex justify-between">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 flex-shrink-0">
                          <img 
                            src={item.image || '/Image/default-food.jpg'} 
                            alt={item.name} 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50">
                <h3 className="font-medium mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>
                      {selectedOrder.deliveryFee === 0 ? 'Free' : `$${selectedOrder.deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <h3 className="font-medium mb-3">Delivery Status</h3>
                <div className="relative">
                  <div className="absolute left-2.5 top-0 h-full w-0.5 bg-gray-200"></div>
                  
                  <div className="relative flex items-start mb-4">
                    <div className={`w-5 h-5 rounded-full ${
                      ['pending', 'confirmed', 'preparing', 'ready', 'delivered'].includes(selectedOrder.status) 
                        ? 'bg-green-500' : 'bg-gray-300'
                    } flex-shrink-0 mt-1`}></div>
                    <div className="ml-4">
                      <h4 className="font-medium">Order Received</h4>
                      <p className="text-sm text-gray-500">Your order has been received</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start mb-4">
                    <div className={`w-5 h-5 rounded-full ${
                      ['confirmed', 'preparing', 'ready', 'delivered'].includes(selectedOrder.status) 
                        ? 'bg-green-500' : 'bg-gray-300'
                    } flex-shrink-0 mt-1`}></div>
                    <div className="ml-4">
                      <h4 className="font-medium">Order Confirmed</h4>
                      <p className="text-sm text-gray-500">Your order has been confirmed</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start mb-4">
                    <div className={`w-5 h-5 rounded-full ${
                      ['preparing', 'ready', 'delivered'].includes(selectedOrder.status) 
                        ? 'bg-green-500' : 'bg-gray-300'
                    } flex-shrink-0 mt-1`}></div>
                    <div className="ml-4">
                      <h4 className="font-medium">Preparing</h4>
                      <p className="text-sm text-gray-500">Your food is being prepared</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start mb-4">
                    <div className={`w-5 h-5 rounded-full ${
                      ['ready', 'delivered'].includes(selectedOrder.status) 
                        ? 'bg-green-500' : 'bg-gray-300'
                    } flex-shrink-0 mt-1`}></div>
                    <div className="ml-4">
                      <h4 className="font-medium">Ready for Pickup/Delivery</h4>
                      <p className="text-sm text-gray-500">Your order is ready</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start">
                    <div className={`w-5 h-5 rounded-full ${
                      selectedOrder.status === 'delivered' 
                        ? 'bg-green-500' : 'bg-gray-300'
                    } flex-shrink-0 mt-1`}></div>
                    <div className="ml-4">
                      <h4 className="font-medium">Delivered</h4>
                      <p className="text-sm text-gray-500">Enjoy your meal!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <Link 
                  to="/menu" 
                  className="text-red-600 hover:underline"
                >
                  Order Again
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Select an Order</h3>
              <p className="text-gray-600">
                Select an order from the list to view its details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;