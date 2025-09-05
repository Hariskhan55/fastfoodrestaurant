// Format price to display with 2 decimal places and currency symbol
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

// Generate a unique order ID
export const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp.slice(-6)}-${randomNum}`;
};

// Calculate order subtotal
export const calculateSubtotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Calculate tax amount (assuming 8% tax rate)
export const calculateTax = (subtotal) => {
  return subtotal * 0.08;
};

// Calculate delivery fee based on subtotal
export const calculateDeliveryFee = (subtotal) => {
  if (subtotal >= 50) {
    return 0; // Free delivery for orders over $50
  }
  return 5.99;
};

// Calculate order total
export const calculateTotal = (subtotal, tax, deliveryFee) => {
  return subtotal + tax + deliveryFee;
};

// Format date for order display
export const formatOrderDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Get order status color
export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800';
    case 'preparing':
      return 'bg-purple-100 text-purple-800';
    case 'ready':
      return 'bg-indigo-100 text-indigo-800';
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};