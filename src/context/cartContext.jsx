import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const cartContext = createContext();

export default function CartContextProvider({ children }) {

  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  const addToCart = (product) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error("You should Signed in first!", { theme: "dark", position: "bottom-right" });
      return;
    }
  
    const isAlreadyInCart = cart.some((item) => item.id === product.id);
    if (!isAlreadyInCart) {
      setCart([...cart, { ...product, count: 1 }]); 
      toast.success("Added to cart!", { theme: "dark", position: "bottom-right" });
    } 
  };
  


  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    toast.success('Removed from cart!', { theme: 'dark', position: 'bottom-right' });
  };

 
  const updateCount = (productId, count) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, count } : item
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared!', { theme: 'dark', position: 'bottom-right' });
  };


  const getCart = () => {
    return cart;
  };


  const numOfCartItems = cart.reduce((total, item) => total + item.count, 0);

 
  const totalCartPrice = cart.reduce((total, item) => total + item.price * item.count, 0);

  return (
    <cartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCount,
        clearCart,
        getCart,
        numOfCartItems,
        totalCartPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}