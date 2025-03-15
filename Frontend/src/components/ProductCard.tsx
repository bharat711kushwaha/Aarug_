import React from 'react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (!product._id) {
      toast.error('Product ID is missing!');
      return;
    }
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-green-600 font-bold text-lg">₹{product.price}</span>
            {product.stock !== undefined && (
              <span className="text-gray-500 text-sm ml-2">In Stock: {product.stock}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 transition-colors"
          >
            <ShoppingCart className="h-3 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
