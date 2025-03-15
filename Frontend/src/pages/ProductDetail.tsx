import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { getProduct } from '../api';
import { ShoppingCart, Edit, Trash, Star, Share2, ArrowLeft, Plus, Minus, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, user, isAdmin, deleteProductById, updateProductById } = useStore();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<any>({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await getProduct(id || '');
        setProduct(data);
        setEditFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      if (quantity > 1) {
        // Add multiple items at once
        for (let i = 0; i < quantity; i++) {
          addToCart(product);
        }
      } else {
        // Add single item
        addToCart(product);
      }
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    // Ensure quantity is between 1 and available stock
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditMode = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original product data
    if (product) {
      setEditFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category
      });
    }
    setImageFile(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', editFormData.name);
      formData.append('description', editFormData.description);
      formData.append('price', editFormData.price);
      formData.append('stock', editFormData.stock);
      formData.append('category', editFormData.category);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      await updateProductById(id || '', formData);
      
      // Fetch updated product data
      const { data } = await getProduct(id || '');
      setProduct(data);
      
      setIsEditing(false);
      toast.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleEditProduct = () => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteProduct = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }
    
    try {
      await deleteProductById(id || '');
      toast.success('Product deleted successfully!');
      navigate('/products'); // Redirect to products page after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      setDeleteConfirm(false);
    }
  };

  // Cancel delete confirmation
  const handleCancelDelete = () => {
    setDeleteConfirm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2">{error || 'Product not found'}</p>
          <button 
            onClick={handleGoBack} 
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const inStock = product.stock > 0;

  const renderProductDetails = () => {
    if (isEditing) {
      return (
        <form onSubmit={handleUpdateProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={editFormData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={editFormData.stock}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                min="0"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={editFormData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              accept="image/*"
            />
            {imageFile && (
              <p className="mt-2 text-sm text-gray-500">New image selected: {imageFile.name}</p>
            )}
            {!imageFile && product.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Current image:</p>
                <img src={product.image} alt="Product preview" className="mt-1 h-20 w-20 object-cover rounded-md" />
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      );
    }
    
    return (
      <>
        <div className="mt-4">
          <p className="text-3xl font-bold text-green-600">₹{product.price}</p>
          <p className={`mt-2 ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Description</h3>
          <p className="mt-2 text-gray-600">{product.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Category</h3>
          <p className="mt-2 text-gray-600">{product.category}</p>
        </div>
        
        {inStock && (
          <div className="mt-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 mr-4">Quantity</h3>
              <div className="flex items-center border rounded-md">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md"
              disabled={!inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button className="flex items-center text-gray-600 hover:text-green-600">
            <Share2 className="h-5 w-5 mr-1" />
            Share Product
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={handleGoBack} 
          className="flex items-center text-gray-600 hover:text-green-600 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Products
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img 
                src={imageFile ? URL.createObjectURL(imageFile) : product.image} 
                alt={product.name} 
                className="w-full h-[400px] object-cover object-center"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                {isEditing ? (
                  <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
                ) : (
                  <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                )}
                
{/* Admin Controls */}
{isAdmin() && !isEditing && (
  <div className="flex space-x-2">
    <button 
      onClick={handleEditMode}
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
      title="Edit Product"
    >
      <Edit className="h-5 w-5" />
    </button>
    {deleteConfirm ? (
      <div className="flex space-x-2">
        <button 
          onClick={handleDeleteProduct}
          className="p-2 bg-red-600 text-white hover:bg-red-700 rounded-md text-sm"
        >
          Confirm
        </button>
        <button 
          onClick={handleCancelDelete}
          className="p-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md text-sm"
        >
          Cancel
        </button>
      </div>
    ) : (
      <button 
        onClick={handleDeleteProduct}
        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
        title="Delete Product"
      >
        <Trash className="h-5 w-5" />
      </button>
    )}
  </div>
)}
              </div>

              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">(15 reviews)</span>
              </div>

              {renderProductDetails()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};