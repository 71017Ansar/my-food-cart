"use client";

import { GetProductsDetail } from "@/app/_utlis/GlobalApi"; // Adjust the import path as necessary
import { useParams } from "next/navigation"; // Use useParams from next/navigation
import { useEffect, useState } from "react";

const RestaurantDetail = () => {
  const params = useParams(); // Get URL parameters
  console.log(params.name);
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
      setProductDetails(response.products); // Assuming response.products is an array
    } catch (error) {
      console.error(error);
      setError("Failed to fetch product details.");
    }
  };

  if (error) return <p>{error}</p>; // Display error message if there's an error

  return (
    <div>
      {productDetails.map((product, i) => (
        <div key={i}>
          <img src={product.picture?.url} alt={product.name} />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Rating: {product.rating}</p>

          {/* Render Menu */}
          <div>
            {product.menu.map((item, j) => (
              <div key={j}>
                <h2>Menu Item: {item.category}</h2>

                {/* Render Menu Items */}
                {item.menuItem && (
                  <div>
                    {item.menuItem.map((menuitem, k) => (
                      <div key={k}>
                        <h3>{menuitem.name}</h3>
                        <img src={menuitem.productImage?.url} alt={menuitem.name} />
                        <p>Description: {menuitem.description}</p>
                        <p>Price: ${menuitem.price}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantDetail;
