import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, Menu, Package } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar = () => {
  const { cart, user } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-green-600">EcoPads</h1>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link to="/education" className="text-gray-700 hover:text-green-600">
              Education
            </Link>
            
            {/* Admin-only Create Product link */}
            {isAdmin && (
              <Link to="/create-product" className="text-gray-700 hover:text-green-600 flex items-center">
                <Package className="h-5 w-5 mr-1" />
                <span>Create Product</span>
              </Link>
            )}
            
            <Link to="/cart" className="relative text-gray-700 hover:text-green-600">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <Link to="/profile" className="text-gray-700 hover:text-green-600">
                <UserIcon className="h-6 w-6" />
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/products"
              className="block px-3 py-2 text-gray-700 hover:bg-green-50"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-green-50"
            >
              About
            </Link>
            <Link
              to="/education"
              className="block px-3 py-2 text-gray-700 hover:bg-green-50"
            >
              Education
            </Link>
            
            {/* Admin-only Create Product link for mobile */}
            {isAdmin && (
              <Link
                to="/create-product"
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 flex items-center"
              >
                <Package className="h-5 w-5 mr-1" />
                <span>Create Product</span>
              </Link>
            )}
            
            <Link
              to="/cart"
              className="block px-3 py-2 text-gray-700 hover:bg-green-50"
            >
              Cart ({cart.length})
            </Link>
            {user ? (
              <Link
                to="/profile"
                className="block px-3 py-2 text-gray-700 hover:bg-green-50"
              >
                Profile
              </Link>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 bg-green-600 text-white rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 bg-green-600 text-white rounded-md"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};