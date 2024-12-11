"use client";

import { GetProductsDetail } from "@/app/_utlis/GlobalApi"; // Adjust the import path as necessary
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import { useEffect, useState } from "react";

const RestaurantDetail = () => {
  const params = useParams(); // Get URL parameters
  const restaurantName = params.name; // Extract the 'name' parameter from the URL
  const [productDetails, setProductDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (restaurantName) {
      getProduct(restaurantName); // Fetch product details based on restaurant name
    }
  }, [restaurantName]);

  const getProduct = async (name) => {
    try {
      const response = await GetProductsDetail(name); // Fetch details using the GraphQL query
      setProductDetails(response.products); // Assuming response.products is an array
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product details.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>; // Display error message if there's an error

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">{restaurantName} Menu</h1>

      {productDetails.map((product, i) => (
        <div key={i} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex flex-col items-center mb-4">
            <img
              src={product.picture?.url}
              alt={product.name}
              className="w-64 h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-yellow-500 font-semibold mt-2">Rating: {product.rating}</p>
          </div>

          <div className="mt-6">
            {product.menu.map((item, j) => (
              <div key={j} className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">{item.category}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                  {item.menuItem && item.menuItem.map((menuitem, k) => (
                    <div key={k} className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                      <img
                        src={menuitem.productImage?.url}
                        alt={menuitem.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h4 className="text-lg font-semibold">{menuitem.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{menuitem.description}</p>
                      <p className="text-xl font-bold text-green-500">${menuitem.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantDetail;
