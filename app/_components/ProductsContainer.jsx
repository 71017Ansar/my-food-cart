import React , {useState} from 'react'
import CategoryList from './CategoryList'
import DishData from './dish'

const ProductsContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    //console.log(selectedCategory)
  return (
    <div>
        <CategoryList setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        <DishData selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </div>
  )
}

export default ProductsContainer