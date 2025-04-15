import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, Menu, Package, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar = () => {
  const { cart, user } = useStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showProfileDialog, setShowProfileDialog] = React.useState(false);
  const profileButtonRef = useRef(null);
  const profileDialogRef = useRef(null);

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleProfileDialog = () => {
    setShowProfileDialog(!showProfileDialog);
  };

  // Close profile dialog when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDialogRef.current && 
        !profileDialogRef.current.contains(event.target) &&
        profileButtonRef.current && 
        !profileButtonRef.current.contains(event.target)
      ) {
        setShowProfileDialog(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              <div className="relative">
                <button 
                  ref={profileButtonRef}
                  onClick={toggleProfileDialog} 
                  className="text-gray-700 hover:text-green-600"
                >
                  <UserIcon className="h-6 w-6" />
                </button>
                
                {/* Desktop Profile Dropdown */}
                {showProfileDialog && (
                  <div 
                    ref={profileDialogRef}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <UserIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <span className="font-medium">{user?.name || 'User'}</span>
                      </div>
                    </div>
                    <div className="py-1">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileDialog(false)}
                      >
                        View Profile
                      </Link>
                      <Link 
                        to="/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileDialog(false)}
                      >
                        My Orders
                      </Link>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => {
                          // Handle logout logic here
                          setShowProfileDialog(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
              onClick={toggleMenu}
              className="text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with close button */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg">
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <h2 className="text-lg font-medium text-gray-900">Menu</h2>
            <button 
              onClick={closeMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-2 pt-2 pb-3">
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/education"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
              onClick={closeMenu}
            >
              Education
            </Link>
            
            {/* Admin-only Create Product link for mobile */}
            {isAdmin && (
              <Link
                to="/create-product"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center"
                onClick={closeMenu}
              >
                <Package className="h-5 w-5 mr-1" />
                <span>Create Product</span>
              </Link>
            )}
            
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600"
              onClick={closeMenu}
            >
              Cart ({cart.length})
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    toggleProfileDialog();
                   
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 flex items-center"
                >
                  <div className="mr-2 bg-green-100 p-1 rounded-full">
                    <UserIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <span>Profile</span>
                </button>
                
                {/* For mobile, we'll show the profile options directly in the menu */}
                {showProfileDialog && (
                  <div className="ml-8 mt-1 border-l-2 border-green-100 pl-4">
                    <Link 
                      to="/profile" 
                      className="block py-2 text-sm text-gray-700"
                      onClick={() => {
                        setShowProfileDialog(false);
                        closeMenu();
                      }}
                    >
                      View Profile
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block py-2 text-sm text-gray-700"
                      onClick={() => {
                        setShowProfileDialog(false);
                        closeMenu();
                      }}
                    >
                      My Orders
                    </Link>
                    <button 
                      className="block w-full text-left py-2 text-sm text-red-600"
                      onClick={() => {
                        // Handle logout logic here
                        setShowProfileDialog(false);
                        closeMenu();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 space-y-2 px-3">
                <Link
                  to="/login"
                  className="block w-full py-2 text-center font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full py-2 text-center font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                  onClick={closeMenu}
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
