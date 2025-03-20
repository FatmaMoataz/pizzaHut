import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../context/cartContext';
import { Helmet } from 'react-helmet';
import Checkout from '../Checkout/Checkout';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
 
 const navigate = useNavigate()
  const {
    cart,
    removeFromCart,
    updateCount,
    clearCart,
    numOfCartItems,
    totalCartPrice,
  } = useContext(cartContext);

  const handleRemoveProduct = (id) => {
    removeFromCart(id);
   
  };

  const handleUpdateCount = (id, count) => {
    if (count < 1) return; 
    updateCount(id, count);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    navigate('/checkout')
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 mx-3">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-4xl  my-5 mx-auto font-medium">My Cart</h2>
          {numOfCartItems > 0 && (
            <button
              onClick={handleClearCart}
              className=" text-[#ee3d40] px-4 py-2 rounded-md hover:text-red-600"
            >
              Clear All
            </button>
          )}
        </div>

        {numOfCartItems === 0 ? (
          <div className="text-center text-gray-500 text-xl py-10">
            Your cart is empty <i className="fa-regular fa-face-sad-tear"></i>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#ee3d40] text-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-16 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img src={product.image} className="w-16 md:w-32" alt={product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold">{product.title}</td>
                  <td className="px-6 py-4 font-semibold">100 EGP</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleUpdateCount(product.id, product.count - 1)}
                      className="px-2 bg-gray-300 rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-4">{product.count}</span>
                    <button
                      onClick={() => handleUpdateCount(product.id, product.count + 1)}
                      className="px-2 bg-gray-300 rounded-r-md"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-6 py-4 font-semibold">
  {(100 * product.count).toFixed(2)} EGP
</td>

                  <td className="px-6 py-4">
                    <span
                      onClick={() => handleRemoveProduct(product.id)}
                      className="text-red-600 cursor-pointer hover:underline"
                    >
                      <i className="fa-regular fa-trash-can fa-lg"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {numOfCartItems > 0 && (
          <div className=" flex justify-between p-5">
            <h3 className="text-2xl font-semibold">
              Total:  {cart.reduce((acc, product) => acc + 100 * product.count, 0).toFixed(2)} EGP
            </h3>
            <button onClick={ handleCheckout} className='btn bg-[#ee3d40] hover:bg-red-800 rounded-sm px-3 py-2 text-white font-medium'>Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}