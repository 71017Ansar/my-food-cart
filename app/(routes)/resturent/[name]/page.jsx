// app/routes/restaurant/[name]/page.jsx

"use client";

import { GetProductsDetail } from "@/app/_utlis/GlobalApi"; // Adjust the import path as necessary
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import { useEffect, useState } from "react";

const RestaurantDetail = () => {
  const params = useParams(); // Get URL parameters
  console.log(params.name)
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
      console.log(response.products);
      setProductDetails(response.products); // Assuming response.products is an array and we want the first product
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product details.");
    }
  };

  if (error) return <p>{error}</p>; // Display error message if there's an error

  return (
    <div>
      {
        productDetails.map((product,i)=>(
          <div key={i}>
            <img src={product.picture?.url} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.category}</p>

            <div>
              {
                product.menu.map((menu,i)=>(
                  <div key={i}>
                    <h1>{menu.name}
                      <img src={menu.picture?.url} alt={menu.name} />
                      <p>{menu.description}</p>
                      <p>{menu.price}</p>
                      <p>{menu.category}</p>
                      <p>{menu.rating}</p>
                      <h1>{menu.name}</h1>
                      

                    </h1>

               
              </div>
                ))
              }

            </div>

          </div>
          
        ))
      }
     
      
    
    </div>
  );
};

export default RestaurantDetail;