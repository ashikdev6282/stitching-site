import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
  query,
  where,
} from 'firebase/firestore';
import { db, auth } from '../config/firbaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Query to fetch only the cart items belonging to the current user
          const userCartQuery = query(
            collection(db, 'cart'),
            where('userId', '==', currentUser.uid) // Filter by user ID
          );

          const cartSnapshot = await getDocs(userCartQuery);
          const cartList = cartSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              userId: data.userId,
              id: doc.id,
              quantity: data.quantity || 1,
              price: data.price || 0,
              discount: data.discount || 0,
              deliveryCharge: data.deliveryCharge || 0,
              ...data,
            };
          });

          setOrders(cartList);
          if (cartList.length > 0) {
            setSelectedOrder(cartList[0]);
          } else {
            setSelectedOrder(null);
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        setOrders([]);
        setSelectedOrder(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle quantity change
  const handleQuantityChange = async (id, change) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === id) {
        const newQuantity = Math.max((order.quantity || 1) + change, 1); // Ensure quantity is at least 1
        updateDoc(doc(db, 'cart', id), { quantity: newQuantity }).catch((error) =>
          console.error('Error updating quantity:', error)
        );

        if (selectedOrder && selectedOrder.id === id) {
          setSelectedOrder({ ...order, quantity: newQuantity });
        }

        return { ...order, quantity: newQuantity };
      }
      return order;
    });
    setOrders(updatedOrders);
    toast.success('Quantity updated successfully!');
  };

  // Handle item removal from cart
  // Handle item removal from cart
const handleRemoveItem = async (id) => {
  try {
    // Remove from Firestore
    const docRef = doc(db, 'cart', id);
    await deleteDoc(docRef);

    // Remove the item from the local state
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);  // Update the state to reflect the removal
    
    // If the removed item was selected, clear the selectedOrder
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder(null);
    }

    toast.error('Item removed from cart');
  } catch (error) {
    console.error('Error removing item:', error);
    toast.error('Failed to remove item. Please try again.');
  }
};


  // Calculate the final total for an order
  const calculateFinalTotal = () => {
    const price = selectedOrder?.price || 0;
    const quantity = selectedOrder?.quantity || 1;
    const discount = selectedOrder?.discount || 0;
    const deliveryCharge = selectedOrder?.deliveryCharge || 0;

    return price * quantity - discount + deliveryCharge;
  };

  // Validate phone number format
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Handle order placement
  const handlePlaceOrder = async () => {
    if (!selectedOrder) {
      toast.warning('Please select an item to place an order.');
      return;
    }

    if (!shippingAddress || !phone) {
      toast.warning('Please provide your shipping address and phone number.');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      toast.warning('Please enter a valid phone number.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.warning('You must be logged in to place an order.');
        return;
      }

      const orderDetails = {
        userId: user.uid,
        items: [
          {
            itemId: selectedOrder.id,
            name: selectedOrder.name,
            quantity: selectedOrder.quantity,
            price: selectedOrder.price,
            discount: selectedOrder.discount,
            deliveryCharge: selectedOrder.deliveryCharge,
          },
        ],
        totalAmount: calculateFinalTotal(),
        finalTotal: calculateFinalTotal(),
        shippingAddress,
        phone,
        orderStatus: 'Pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'PlacedOrders'), orderDetails);
      toast.success('Order placed successfully!');
      setOrders([]);
      setSelectedOrder(null);
      setShippingAddress('');
      setPhone('');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  // Effect to clear selectedOrder if the cart becomes empty
  useEffect(() => {
    if (orders.length === 0) {
      setSelectedOrder(null);
    }
  }, [orders]);

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading your cart...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-600 uppercase">My Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {orders.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  className={`bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition ${
                    selectedOrder?.id === order.id ? 'border-2 border-yellow-500' : ''
                  }`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={order.image || 'https://via.placeholder.com/150'}
                    alt={order.name || 'Product'}
                    className="h-40 w-40 object-cover mb-4 mx-auto rounded-md"
                  />
                  <h3 className="text-lg font-semibold mb-2">{order.name || 'Unnamed Product'}</h3>
                  <p className="text-gray-600 mb-2">₹{order.price || 0}</p>
                  <p className="text-gray-600 mb-2">Quantity: {order.quantity || 1}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(order.id, -1)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{order.quantity || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(order.id, 1)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="mt-4 text-blue-600 px-4 py-2 hover:underline"
                  >
                    Select This
                  </button>
                  <button
                    onClick={() => handleRemoveItem(order.id)}
                    className="mt-4 text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div>
          {selectedOrder ? (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Selected Item: <span className="text-yellow-600">{selectedOrder.name}</span>
                </h2>
              </div>
              <p className="font-semibold text-lg flex justify-between">
                <span>Price:</span>
                <span>₹{selectedOrder.price || 0}</span>
              </p>
              <p className="font-semibold text-lg flex justify-between">
                <span>Discount:</span>
                <span>-₹{selectedOrder.discount || 0}</span>
              </p>
              <p className="font-semibold text-lg flex justify-between">
                <span>Delivery Charges:</span>
                <span>₹{selectedOrder.deliveryCharge || 0}</span>
              </p>
              <p className="font-semibold text-lg flex justify-between border-t-2 border-gray-200 mt-4 pt-4">
                <span>Total:</span>
                <span>₹{calculateFinalTotal()}</span>
              </p>

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Shipping Address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 mb-4 border rounded-lg"
                />
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg"
                >
                  Place Order
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="text-center text-gray-500">Please select an item from the cart</div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default MyOrders;
