export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
  }