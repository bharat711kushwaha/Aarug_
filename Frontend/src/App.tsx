
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import Footer from './pages/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import  About  from './pages/About';
import { Education } from './pages/Education';
import { Cart } from './pages/Cart';

import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { CreateProduct } from './pages/CreateProduct';
import { ProtectedRoute } from './pages/ProtectedRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes - require login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/profile" element={<Profile />} />
          </Route>
          
          {/* Admin-only routes */}
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/create-product" element={<CreateProduct />} />
          </Route>
          
          {/* Catch-all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;