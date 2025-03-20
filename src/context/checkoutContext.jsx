import React, { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const checkoutContext = createContext();

export default function CheckoutContextProvider({ children }) {
  const ORDER_API_URL = `https://ecommerce.routemisr.com/api/v1/orders`;

  const userToken = localStorage.getItem("userToken");

  const headers = {
    token: userToken,
  };

  async function cashOnDelivery(shippingAddress) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (!userToken) {
      toast.error("Please sign in first.", { theme: "dark", position: "bottom-right" });
      return;
    }
  
    if (cart.length === 0) {
      toast.error("Your cart is empty!", { theme: "dark", position: "bottom-right" });
      return;
    }
  
    try {
    
      console.log("Shipping Address:", shippingAddress);
      console.log("Cart:", cart);
      console.log("User Token:", userToken);
  
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders`,
        { shippingAddress, cart }, 
        { headers } 
      );
  
      if (data.status === "success") {
        toast.success("Order placed successfully!", { theme: "dark", position: "bottom-right" });
      }
      return data;
    } catch (error) {
  
      console.error("Error Response:", error.response?.data);
      toast.error("Failed to place order.", { theme: "dark", position: "bottom-right" });
    }
  }

  async function onlinePayment(shippingAddress) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

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
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session?url=http://localhost:5173`,
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
