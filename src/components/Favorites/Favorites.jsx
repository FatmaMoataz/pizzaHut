import React, { useContext, useEffect } from 'react';
import { favoritesContext } from '../../context/favoritesContext';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/cartContext';

export default function Favorites() {
  const { favorites, removeFromFavorites, refreshFavorites } = useContext(favoritesContext);
  const { addToCart, getCart } = useContext(cartContext);

  async function addProductToCart(product) {
    try {
      await addToCart(product);
      getCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function removeProductFromFavorites(id) {
    try {
      await removeFromFavorites(id);
      refreshFavorites();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    refreshFavorites();
  }, []);

  return (
    <>
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 mx-3">
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-4xl my-5 text-main font-medium">My Favorites</h2>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center text-gray-500 text-xl py-10">
            You have no favorites yet <i className="fa-regular fa-face-sad-tear"></i>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#ee3d40] text-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-16 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Social Rank</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Cart</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((product) => (
                <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img src={product.image} className="w-16 md:w-32" alt={product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold">{product.title}</td>
                  <td className="px-6 py-4 font-semibold">100 EGP</td>

                  <td className="px-6 py-4">
                    <span onClick={() => removeProductFromFavorites(product.id)} className="text-red-600 cursor-pointer hover:underline">
                      <i className="fa-regular fa-trash-can fa-lg"></i>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => addProductToCart(product)} className="btn bg-green-500 hover:bg-green-700 text-white px-3 py-2 rounded-md">
                      Add To Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
