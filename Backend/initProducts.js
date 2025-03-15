import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Regular Flow Pad',
    description: 'Comfortable and absorbent reusable pad for regular flow days. Made with organic cotton.',
    price: 299,
    image: 'https://img.freepik.com/free-photo/top-view-hands-holding-menstrual-products_23-2149734185.jpg?t=st=1741670130~exp=1741673730~hmac=9a002cfb3aab95d83fee84282213af6b88f69d5a3e0e266e1e7da1f363b5766e&w=1060',
    category: 'Regular',
    stock: 50
  },
  {
    name: 'Heavy Flow Pad',
    description: 'Extra absorbent pad designed for heavy flow days. Features multiple layers for maximum protection.',
    price: 399,
    image: 'https://img.freepik.com/free-photo/reproductive-system-white-underwear-top-view_23-2149703423.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Heavy',
    stock: 40
  },
  {
    name: 'Starter Kit',
    description: 'Perfect for beginners. Includes 3 regular and 2 heavy flow pads with a waterproof carry bag.',
    price: 999,
    image: 'https://img.freepik.com/premium-photo/bright-colored-cotton-pads-menstrual-cups-feminine-hygiene_255440-1715.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Kit',
    stock: 30
  },
  {
    name: 'Overnight Pad',
    description: 'Designed for overnight protection. Longer length and enhanced absorbency ensure a leak-free night.',
    price: 499,
    image: 'https://img.freepik.com/premium-photo/directly-shot-heart-shape-pink-background_1048944-16505738.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Overnight',
    stock: 35
  },
  {
    name: 'Pantyliner',
    description: 'Slim and discreet reusable pantyliner for light days or backup protection. Made with breathable materials.',
    price: 199,
    image: 'https://img.freepik.com/free-photo/woman-holding-menstrual-cup-pad-high-angle_23-2149734206.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Light',
    stock: 60
  },
  {
    name: 'Postpartum Pad',
    description: 'Extra-long and absorbent pad ideal for postpartum care. Provides comfort and protection during recovery.',
    price: 599,
    image: 'https://img.freepik.com/premium-photo/high-angle-view-equipment-field_1048944-8940337.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Postpartum',
    stock: 25
  },
  {
    name: 'Active Pad',
    description: 'Designed for active lifestyles. Secure fit and moisture-wicking fabric keep you comfortable during workouts.',
    price: 349,
    image: 'https://img.freepik.com/premium-photo/washable-feminine-hygiene-products-set-clean-hygienic-reusable-pads-menstrual-cycle-womens_829251-539.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Active',
    stock: 45
  },
  {
    name: 'Teen Starter Kit',
    description: 'A starter kit designed for teens. Includes a variety of pads to cover different flow days and a discreet pouch.',
    price: 899,
    image: 'https://img.freepik.com/premium-photo/zero-waste-periods-kit-reusable-sanitary-pads_72402-5586.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Kit',
    stock: 20
  },
  {
    name: 'Organic Cotton Pad',
    description: 'Made from 100% organic cotton. Soft, breathable, and ideal for sensitive skin.',
    price: 329,
    image: 'https://img.freepik.com/free-photo/menstruation-cup-desk_23-2148889870.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Regular',
    stock: 55
  },
  {
    name: 'Travel Kit',
    description: 'Compact travel kit including 2 regular pads, 1 heavy flow pad, and a waterproof carrying case.',
    price: 749,
    image: 'https://img.freepik.com/free-photo/top-view-knickers-with-sanitary-towel_23-2148104173.jpg?ga=GA1.1.1310929021.1706160487&semt=ais_hybrid',
    category: 'Kit',
    stock: 30
  }
];

const initializeProducts = async () => {
    try {
      if (!process.env.MONGODB_URL) {
        throw new Error("MongoDB connection string is missing in .env file!");
      }
      console.log("MongoDB URL:", process.env.MONGODB_URL);

      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("✅ Connected to MongoDB");
  
      await Product.deleteMany({});
      await Product.insertMany(products);
      console.log("✅ Products inserted successfully");
  
      await mongoose.disconnect();
      console.log("✅ Disconnected from MongoDB");
    } catch (error) {
      console.error("❌ Error initializing products:", error.message);
      process.exit(1);
    }
  };
  
initializeProducts();