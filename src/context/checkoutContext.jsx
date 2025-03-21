import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { cartContext } from './cartContext';

export const checkoutContext = createContext();

export default function CheckoutContextProvider({ children }) {
  const { cart, clearCart } = useContext(cartContext);

  const ORDER_API_URL = `https://ecommerce.routemisr.com/api/v1/orders`;
  const CHECKOUT_SESSION_URL = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session`;

  async function cashOnDelivery(shippingAddress) {
    const userToken = localStorage.getItem("token"); 
    const headers = { token: userToken };
  
    if (!userToken) {
      toast.error("Please sign in first.", { theme: "dark", position: "bottom-right" });
      return;
    }
  
    if (cart.length === 0) {
      toast.error("Your cart is empty!", { theme: "dark", position: "bottom-right" });
      return;
    }
  
    try {
      const { data } = await axios.post(ORDER_API_URL, { shippingAddress, cart }, { headers });

      if (data.status === "success") {
        toast.success("Order placed successfully!", { theme: "dark", position: "bottom-right" });
        clearCart();
      }
  
      return data;
    } catch (error) {
      console.error("Error Response:", error.response?.data);
      toast.error("Failed to place order.", { theme: "dark", position: "bottom-right" });
    }
  }

  async function onlinePayment(shippingAddress) {
    const userToken = localStorage.getItem("token"); 
    const headers = { token: userToken };
  
    if (!userToken) {
      toast.error("Please sign in first.", { theme: "dark", position: "bottom-right" });
      return;
    }
  
    if (cart.length === 0) {
      toast.error("Your cart is empty!", { theme: "dark", position: "bottom-right" });
      return;
    }
  
    try {
      const { data } = await axios.post(
        `${CHECKOUT_SESSION_URL}?url=http://localhost:5173`,
        { shippingAddress, cart },
        { headers }
      );

      if (data.status === "success") {
        window.location.href = data.session.url;
      }
      
      return data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment.", { theme: "dark", position: "bottom-right" });
    }
  }

  return (
    <checkoutContext.Provider value={{ cashOnDelivery, onlinePayment }}>
      {children}
    </checkoutContext.Provider>
  );
}
