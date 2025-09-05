import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatOrderDate, getStatusColor } from '../utils/cartUtils';

const Admin = () => {
  const { currentUser, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatuses] = useState([
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'delivered',
    'cancelled'
  ]);
  
  // Redirect to login if not authenticated or not admin
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: { pathname: '/admin' } }} />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/" />;
  }
  
  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);
  
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };
  
  const handleStatusChange = (orderId, newStatus) => {
    // Update order status
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">All Orders</h2>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No orders found
              </div>
            ) : (
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
            )}
          </div>
        </div>
        
        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Order Details</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Status:</span>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      {orderStatuses.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
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
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Select an Order</h3>
              <p className="text-gray-600">
                Select an order from the list to view and manage its details.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Dashboard Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-red-600">{orders.length}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {orders.filter(order => order.status === 'pending').length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Delivered Orders</h3>
          <p className="text-3xl font-bold text-green-600">
            {orders.filter(order => order.status === 'delivered').length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-blue-600">
            ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;