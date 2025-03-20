import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { BounceLoader } from "react-spinners";
import { favoritesContext } from "../../context/favoritesContext";
import { cartContext } from "../../context/cartContext";

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites, addToFavorites, removeFromFavorites } = useContext(favoritesContext);
  const { addToCart } = useContext(cartContext);

  async function getAllMenu() {
    setLoading(true);
    try {
      let response = await axios.get(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
      const extractedData = response.data.recipes.map((recipe) => ({
        id: recipe.recipe_id,
        title: recipe.title,
        image: recipe.image_url,
        socialRank: recipe.social_rank,
      }));

      setMenuItems(extractedData);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllMenu();
  }, []);


  const isItemInFavorites = (itemId) => favorites.some((item) => item.id === itemId);


  const handleFavoriteClick = async (item) => {
    if (isItemInFavorites(item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const filteredItems = menuItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <>
      <Helmet>
        <title>Menu</title>
      </Helmet>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-medium mb-4 text-center">Menu</h1>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search for a recipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2"
          />
        </div>

        
        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex justify-center mx-auto w-full">
              <BounceLoader color="#ee3d40" size={50} />
            </div>
          ) : filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white shadow-md p-4 rounded-lg">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md" />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">Social Rank: {item.socialRank.toFixed(1)}</p>
                </div>

                <div className="flex justify-between items-center mt-3">
               
                  <i
                    className={`fa-${isItemInFavorites(item.id) ? "solid" : "regular"} fa-heart text-2xl cursor-pointer text-red-500`}
                    onClick={() => handleFavoriteClick(item)}
                  ></i>

                  <button onClick={() => addToCart(item)} className="bg-[#ee3d40] hover:bg-red-800 text-white px-4 py-2 rounded-sm">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}
