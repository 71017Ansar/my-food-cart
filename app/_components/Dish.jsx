"use client";

import React, { useState, useEffect } from 'react';
import { GetBusiness } from '../_utlis/GlobalApi'; // Ensure you are importing correctly

const DishData = ({selectedCategory, setSelectedCategory}) => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
 console.log( setSelectedCategory)
  
  // Add error state for better error handling

  const getDishes = async () => {
    try {
      const result = await GetBusiness(); // Call the GetBusiness function directly
      setDishes(result.products); // Assuming result.products contains the array of dishes
    } catch (error) {
      console.error('Error fetching dishes:', error);
      setError("Failed to fetch dishes. Please try again later."); // Set error message
    }
  };

  useEffect(() => {
    getDishes();
  
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Delicious Dishes</h1>
      
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message if exists */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dishes.map((dish, index) => (
          <div key={index}  className={`border flex flex-col justify-end items-center hover:border-green-500 transform hover:scale-105  ease-in-out delay-100 border-gray-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-700 
            ${selectedCategory === dish.name || selectedCategory === "all" ? "block" : "hidden"}
            `
          }>
            <img
              src={dish.picture.url} 
              alt={`${dish.name} image`}
              className="w-50 h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{dish.name}</h2>
              <p className="text-gray-600 mt-1">{dish.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">Order Now</span>
                <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishData;