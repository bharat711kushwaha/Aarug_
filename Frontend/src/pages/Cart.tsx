import { useStore } from '../store/useStore';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity, processPayment } = useStore();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (productId: string, newQuantity: number, stock: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Item removed from cart');
      return;
    }
    if (newQuantity > stock) {
      toast.error('Cannot exceed available stock');
      return;
    }
    updateCartItemQuantity(productId, newQuantity);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <a href="/products" className="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center py-4 border-b last:border-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1 ml-6">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.stock)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <MinusCircle size={20} />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.stock)}
                        className="text-gray-500 hover:text-green-500"
                      >
                        <PlusCircle size={20} />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-600 font-bold">₹{item.price * item.quantity}</span>
                      <button
                        onClick={() => {
                          removeFromCart(item._id);
                          toast.success('Item removed from cart');
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">₹{calculateTotal()}</span>
            </div>
            <button onClick={() => processPayment(calculateTotal())} className="w-full btn btn-primary">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
