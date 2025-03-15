import { create } from "zustand";
import { CartItem, Product, User } from "../types";
import { 
  createPayment, 
  verifyPayment, 
  createOrder, 
  login, 
  register, 
  getMyOrders,
  deleteProduct,
  updateProduct,
  getProducts
} from "../api";
import toast from "react-hot-toast";
import { persist } from "zustand/middleware";

interface Store {
  user: User | null;
  cart: CartItem[];
  products: Product[];
  orders: any[]; 
  setUser: (user: User | null) => void;
  fetchUserOrders: () => Promise<void>;
  fetchProducts: () => Promise<void>;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  setProducts: (products: Product[]) => void;
  processPayment: (amount: number) => void;
  isAdmin: () => boolean;
  // New functions for product CRUD
  deleteProductById: (productId: string) => Promise<void>;
  updateProductById: (productId: string, productData: FormData) => Promise<void>;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      products: [],
      orders: [],

      isAdmin: () => get().user?.role === 'admin',

      setUser: (user) => set({ user }),

      fetchUserOrders: async () => {
        try {
          const { data } = await getMyOrders();
          set({ orders: data });
        } catch (error) {
          console.error("Failed to fetch user orders", error);
        }
      },
      
      // Added a function to fetch products
      fetchProducts: async () => {
        try {
          const { data } = await getProducts();
          set({ products: data });
        } catch (error) {
          console.error("Failed to fetch products", error);
          toast.error("Failed to load products");
        }
      },

      // Added function to delete product
      deleteProductById: async (productId: string) => {
        try {
          // Only admin should be able to delete
          if(!get().isAdmin()) {
            toast.error("Unauthorized! Only admin can delete products");
            return;
          }

          await deleteProduct(productId);
          
          // Update products list after deletion
          set((state) => ({
            products: state.products.filter((product) => product._id !== productId)
          }));
          
          toast.success("Product deleted successfully!");
        } catch (error) {
          console.error("Failed to delete product", error);
          toast.error("Failed to delete product");
        }
      },

      // Added function to update product
      updateProductById: async (productId: string, productData: FormData) => {
        try {
          // Only admin should be able to update
          if(!get().isAdmin()) {
            toast.error("Unauthorized! Only admin can update products");
            return;
          }
          
          const { data } = await updateProduct(productId, productData);
          
          // Update products list with updated product
          set((state) => ({
            products: state.products.map((product) => 
              product._id === productId ? data : product
            )
          }));
          
          toast.success("Product updated successfully!");
        } catch (error) {
          console.error("Failed to update product", error);
          toast.error("Failed to update product");
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, cart: [], orders: [] });
        toast.success("Logged out successfully!");
      },

      addToCart: (product) =>
        set((state) => {
          if (product.stock <= 0) {
            toast.error("This product is out of stock!");
            return state;
          }
          
          const existingItem = state.cart.find((item) => item._id === product._id);

          if (existingItem) {
            if (existingItem.quantity + 1 > product.stock) {
              toast.error("Cannot add more of this item - stock limit reached!");
              return state;
            }
            
            toast.success("Item quantity increased!");
            return {
              cart: state.cart.map((item) =>
                item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }

          toast.success("Item added to cart!");
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((state) => {
          toast.success("Item removed from cart");
          return {
            cart: state.cart.filter((item) => item._id !== productId),
          };
        }),

      updateCartItemQuantity: (productId, quantity) =>
        set((state) => {
          const product = state.products.find(p => p._id === productId);
          
          if (product && quantity > product.stock) {
            toast.error("Cannot add more - stock limit reached!");
            quantity = product.stock;
          }
          
          if (quantity <= 0) {
            toast.success("Item removed from cart");
            return {
              cart: state.cart.filter((item) => item._id !== productId),
            };
          }
          
          return {
            cart: state.cart.map((item) =>
              item._id === productId ? { ...item, quantity } : item
            ),
          };
        }),

      setProducts: (products) => set({ products }),

      processPayment: async (amount: number) => {
        try {
          toast.loading("Processing Payment...");

          const { data: order } = await createPayment(amount);
          if (!order) {
            toast.error("Payment creation failed!");
            return;
          }

          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Aarug",
            description: "Purchase from Aarug Store",
            order_id: order.id,
            handler: async (response: any) => {
              const paymentData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              };

              const { data } = await verifyPayment(paymentData);
              if (data.message === "Payment verified successfully") {
                toast.success("Payment Successful! 🎉");

                await createOrder({
                  userId: get().user?._id,
                  items: get().cart,
                  total: amount,
                  paymentId: response.razorpay_payment_id,
                });

                set({ cart: [] });
                get().fetchUserOrders();
              } else {
                toast.error("Payment verification failed!");
              }
            },
            prefill: {
              name: get().user?.name || "Guest",
              email: get().user?.email || "guest@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#10B981",
            },
          };

          const razorpay = new (window as any).Razorpay(options);
          razorpay.open();
        } catch (error) {
          console.error("Payment Error:", error);
          toast.error("Something went wrong during payment!");
        }
      },
    }),
    {
      name: "aarug-store",
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
      }),
    }
  )
);