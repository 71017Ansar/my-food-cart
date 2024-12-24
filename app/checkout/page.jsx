"use client";

import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import { useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { GetUserCart } from "@/app/_utlis/GlobalApi";
import { CreateNewOrder } from "@/app/_utlis/GlobalApi";

const CheckOut = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cart, setCart] = useState([]);
  const { isLoaded, user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [deliveryAmount, setDeliveryAmount] = useState(15);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const FetchUserCart = async () => {
    const email = user?.primaryEmailAddress?.emailAddress?.trim();

    if (!email) {
      console.error("Email is not defined or empty!");
      return;
    }

    try {
      const cartData = await GetUserCart(email);
      if (cartData && cartData.userCarts) {
        setCart(cartData.userCarts);
        calculateTotal(cartData.userCarts);
      } else {
        console.warn("No cart data found for the provided email:", email);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error.message, error.stack);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      setEmail(user.primaryEmailAddress.emailAddress || "");
      FetchUserCart();
    }
  }, [isLoaded, user, updateCart]);

  const calculateTotal = (cart_) => {
      let total = 0;
      cart_.forEach((item) => {
        total = total + item.price ;
      });
     
    setSubTotal(total);
    const tax = total * 0.09; // Example: 9% tax
    setTaxAmount(tax);
    setDeliveryAmount(15); // Example: fixed delivery fee
    setTotalAmount(total + tax + 15);
  };

 

  const addToOrder = async () => {
    const data = {
      email: user.primaryEmailAddress.emailAddress || "",
      orderAmount: totalAmount, // Ensure totalAmount is a valid number
      userName: user.fullName || "",
      address: address || "",
      phone: phone || "",
      zip: zip || "",
    };
  
    try {
      // Validate orderAmount
      if (!data.email || !data.userName || !data.address || !data.phone || !data.zip) {
        console.error("Missing required fields in order data:", data);
        throw new Error("All fields are required.");
      }
  
      if (isNaN(data.orderAmount) || data.orderAmount <= 0) {
        console.error("Invalid Order Amount:", data.orderAmount);
        throw new Error("Order amount must be a valid positive number.");
      }
  
      console.log("Order Data:", data);
      const res = await CreateNewOrder(data);
      console.log("Order Response:", res.createOrder.id);
      const resultId = res.createOrder.id;

      if (resultId){
        cart.forEach(async (item) => {
          UpdateOrderToAddOrderDetails(item.price, phone, user.fullName, resultId);

        });
      }
    } catch (error) {
      console.error("Order Creation Error:", error.message);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Billing Details */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Billing Details</h1>
          <form className="space-y-6" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="Zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>${deliveryAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <button  onClick={() => addToOrder() }
            className="w-full mt-6 bg-green-600 text-white py-2 rounded-md text-lg font-medium hover:bg-green-700 transition duration-150"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
