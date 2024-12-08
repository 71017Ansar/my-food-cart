// app/routes/restaurant/[name]/page.jsx

"use client";

import { GetProductsDetail } from "@/app/_utlis/GlobalApi"; // Adjust the import path as necessary
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import { useEffect, useState } from "react";

const RestaurantDetail = () => {
  const params = useParams(); // Get URL parameters
  const restaurantName = params.name; // Extract the 'name' parameter from the URL
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (restaurantName) {
      getProduct(restaurantName); // Fetch product details based on restaurant name
    }
  }, [restaurantName]);

  const getProduct = async (name) => {
    try {
      const response = await GetProductsDetail(name); // Fetch details using the GraphQL query
      console.log(response);
      setProductDetails(response.products[0]); // Assuming response.products is an array and we want the first product
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product details.");
    }
  };

  if (error) return <p>{error}</p>; // Display error message if there's an error

  return (
    <div>
      {productDetails ? (
        <>
          <h1>{productDetails.name}</h1>
          <img src={productDetails.picture?.url || 'default-image.jpg'} alt={productDetails.name} />
          <p>{productDetails.description}</p>

          {/* Render menu items if they exist */}
          {productDetails.menu?.map(menu => (
            <div key={menu.id}>
              <h2>{menu.category}</h2>
              {menu.menuItem.map(item => (
                <div key={item.id}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span>{item.price}</span>
                  {item.productImage && (
                    <img src={item.productImage.url || 'default-image.jpg'} alt={item.name} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p> // Show loading state while fetching data
      )}
    </div>
  );
};

export default RestaurantDetail;