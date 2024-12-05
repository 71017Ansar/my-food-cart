'use client';

import React, { useState, useEffect } from 'react';
import { GetBusiness } from '../_utlis/GlobalApi';
import Rating from './Rating'; // Import the Rating component

const DishData = ({ selectedCategory }) => {
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(null);

    // Fetch dishes from API and add a `userRating` field
    useEffect(() => {
        const getDishes = async () => {
            try {
                const result = await GetBusiness();
                const dishesWithRatings = (result.products || []).map(dish => ({
                    ...dish,
                    userRating: dish.rating || 0, // Default to API rating or 0
                }));
                setDishes(dishesWithRatings);
            } catch (err) {
                console.error('Error fetching dishes:', err);
                setError('Failed to fetch dishes. Please try again later.');
            }
        };
        getDishes();
    }, []);

    // Filter dishes by selected category
    const filteredDishes = selectedCategory === 'all'
        ? dishes
        : dishes.filter(dish => dish.name.toLowerCase() === selectedCategory.toLowerCase());

    // Update user rating for a specific dish
    const handleRatingChange = (index, newRating) => {
        const updatedDishes = [...dishes];
        updatedDishes[index].userRating = newRating; // Update the rating
        setDishes(updatedDishes); // Update state with new rating
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Delicious Dishes</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish, index) => (
                    <div
                        key={index}
                        className="border flex flex-col justify-end items-center hover:border-green-500 transform hover:scale-105 ease-in-out delay-100 border-gray-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-700"
                    >
                        <img
                            src={dish.picture.url}
                            alt={`${dish.name} image`}
                            className="w-50 h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{dish.name}</h2>
                            <p className="text-gray-600 mt-1">{dish.description}</p>

                            {/* Add the Rating Component */}
                            <div className="mt-2">
                                <Rating
                                    maxStars={5}
                                    onRatingChange={(newRating) => handleRatingChange(index, newRating)}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Your Rating: {dish.userRating} / 5
                                </p>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-green-600">{ dish.price}</span>
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
