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
      const response = await GetProductsDetail(name);
      console.log(response); // Fetch details using the GraphQL query
      setProductDetails(response.products); // Assuming response.products is an array
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product details.");
    }
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>; // Display error message if there's an error

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative mb-12">
        <img
          src="https://img.freepik.com/premium-vector/food-menu-restaurant-facebook-cover-template-banner-design_624457-3915.jpg" // Add restaurant banner or logo
          alt={`${restaurantName} banner`}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
          <h1 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-4xl font-extrabold text-white text-center">
            {restaurantName} Menu
          </h1>
        </div>
      </div>

      {productDetails.map((product, i) => (
        <div key={i} className="bg-white shadow-lg rounded-lg p-6 mb-8">
          {/* Restaurant Info */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={product.picture?.url}
              alt={product.name}
              className="w-90 h-64 object-cover rounded-lg mb-4 shadow-md"
            />
            <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
            <div className="text-center mt-2">
              <h3 className="text-lg text-green-500 font-semibold flex flex-row justify-start items-center hover:cursor-pointer hover:text-blue-500"> Restaurant Name: {product.restaurantName}</h3>
              <h4 className="text-md text-green-500 font-semibold flex flex-row justify-start items-center hover:cursor-pointer hover:text-blue-500 "> Location: {product.restaurantLocation}</h4>
              <p className="text-sm text-gray-500 mt-2">{product.description}</p>
              <p className="text-yellow-500 font-semibold text-lg mt-4">Rating: {product.rating}</p>
            </div>
          </div>

          {/* Menu Section */}
          <div className="mt-6">
            {product.menu.map((item, j) => (
              <div key={j} className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800">{item.category}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
                  {item.menuItem && item.menuItem.map((menuitem, k) => (
                    <div key={k} className="bg-gray-50 p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                      <img
                        src={menuitem.productImage?.url}
                        alt={menuitem.name}
                        className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                      />
                      <h4 className="text-lg font-semibold text-gray-800">{menuitem.name}</h4>
                      <p className="text-sm text-gray-500 mb-2">{menuitem.description}</p>
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
