import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firbaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'; // Import Framer Motion

const Shop = () => {
  const [suits, setSuits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else setCurrentUser(null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Data (Suits and Categories)
  useEffect(() => {
    const fetchData = async () => {
      const suitsCollection = collection(db, 'suits');
      const categoriesCollection = collection(db, 'categories');

      // Fetch suits based on the selected category
      const suitsQuery = query(
        suitsCollection,
        ...(selectedCategory ? [where('category', '==', selectedCategory)] : [])
      );
      const suitsSnapshot = await getDocs(suitsQuery);
      const suitsList = suitsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuits(suitsList);

      // Fetch categories for filtering
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data().name);
      setCategories(categoriesList);

      setLoading(false); // Mark loading as complete
    };

    fetchData();
  }, [selectedCategory]);

  // Add to Cart Function
  const handleAddToCart = async (suit) => {
    if (!currentUser) {
      toast.warn('Please log in to add items to your cart.');
      return;
    }

    try {
      const cartCollection = collection(db, 'cart');

      // Check if the item already exists in the cart for the current user
      const cartQuery = query(cartCollection, where('userId', '==', currentUser.uid), where('id', '==', suit.id));
      const cartQuerySnapshot = await getDocs(cartQuery);

      if (!cartQuerySnapshot.empty) {
        // If the item already exists in the cart, update its quantity
        const existingItemRef = cartQuerySnapshot.docs[0].ref;
        const updatedQuantity = cartQuerySnapshot.docs[0].data().quantity + 1;
        await updateDoc(existingItemRef, { quantity: updatedQuantity });
      } else {
        // If the item is not in the cart, add it
        await addDoc(cartCollection, {
          userId: currentUser.uid,
          id: suit.id,
          name: suit.name,
          price: suit.price,
          image: suit.image,
          stock: suit.stock,
          discount: suit.discount || 0,
          deliveryCharge: suit.deliveryCharge || 0,
          quantity: 1,
        });
      }

      toast.success('Item added to your cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart.');
    }
  };

  // Handle Buy Now (Assuming you want to redirect to a checkout page or initiate purchase)
  const handleBuyNow = async (suit) => {
    if (!currentUser) {
      toast.warn('Please log in to purchase items.');
      return;
    }

    try {
      // Simulate order placement process (redirect to checkout, etc.)
      toast.success('Proceeding to checkout...');
      // Redirect to checkout page or initiate buy-now flow
      // window.location.href = '/checkout';  // Example: redirect to checkout page

    } catch (error) {
      console.error('Error during purchase:', error);
      toast.error('Failed to initiate purchase.');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-xl">
        Loading suits...
        {/* You can use a spinner or other loading animations here */}
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-600 uppercase">Shop Suits</h1>

      {/* Filters Section */}
      <div className="flex justify-between items-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-4 py-2 text-yellow-600 uppercase mb-6"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Suits Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {suits.map((suit) => (
          <motion.div
            key={suit.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={suit.image}
              alt={suit.name}
              className="h-48 w-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{suit.name}</h3>
            <p className="text-gray-700 mb-4">${suit.price}</p>
            <div className="flex space-x-2">
              <motion.button
                onClick={() => handleAddToCart(suit)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                whileHover={{ scale: 1.1 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                onClick={() => handleBuyNow(suit)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                whileHover={{ scale: 1.1 }}
              >
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Shop;
