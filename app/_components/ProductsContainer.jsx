import React, { useState } from 'react';
import CategoryList from './CategoryList';
import DishData from './Dish';

const ProductsContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div>
            <CategoryList setSelectedCategory={setSelectedCategory} />
            <DishData selectedCategory={selectedCategory} />
        </div>
    );
};

export default ProductsContainer;
