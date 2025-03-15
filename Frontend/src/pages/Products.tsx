import { useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/useStore';
import { getProducts } from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export const Products = () => {
  const { products, setProducts } = useStore();
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        console.log('Fetched products:', response.data); // Log fetched products
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, [setProducts]);

  // Function to handle product click and navigate to detail page
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // Navigate to product detail page with product ID
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        {/* Show message if no products are available */}
        {products.length === 0 ? (
          <p className="text-center text-xl text-gray-500">No products available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div 
                key={product._id} 
                onClick={() => handleProductClick(product._id)}
                className="cursor-pointer" // Add cursor pointer to show it's clickable
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};