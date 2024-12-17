"use client";

import { GetProductsDetail } from "@/app/_utlis/GlobalApi";
import { SquarePlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner"; // Ensure this library is installed
import { AddToCart } from "@/app/_utlis/GlobalApi";

const RestaurantDetail = () => {
  const params = useParams();
  const restaurantName = params.name;
  const [productDetails, setProductDetails] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser();

  // Add to cart handler
  const AddToCartHandler = async (menuitem) => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("Email is required.");
      return;
    }
  
    const data = {
      email: user?.primaryEmailAddress?.emailAddress || "", 
      productName: menuitem?.name || "Unnamed Item",
      price: menuitem?.price || 0.0,
      productdescription: menuitem?.description || "No description available",
    };
    console.log("Adding to cart with data:", data);
  
    toast("Adding to cart...");
  
    try {
      const response = await AddToCart(data);
      console.log("Add to Cart Response:", response);
      toast.success("Added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  // Fetch Product Details
  useEffect(() => {
    if (restaurantName) {
      getProduct(restaurantName);
    }
  }, [restaurantName]);

  const getProduct = async (name) => {
    try {
      const response = await GetProductsDetail(name);
      console.log("Full API Response:", response);
      setProductDetails(response.products || []);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to fetch product details.");
    }
  };

  // Error Handling
  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  // Fallback for No Data
  if (!productDetails.length) {
    return <p className="text-gray-500 text-center">No products found for this restaurant.</p>;
  }

  // Render UI
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-12">
        <img
          src="https://img.freepik.com/premium-vector/food-menu-restaurant-facebook-cover-template-banner-design_624457-3915.jpg"
          alt={`${restaurantName} banner`}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
          <h1 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-4xl font-extrabold text-white">
            {restaurantName} Menu
          </h1>
        </div>
      </div>

      {productDetails.map((product, i) => (
        <div key={i} className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src={product.picture?.url || "/images/placeholder.jpg"} // Use a valid placeholder image URL
              alt={product.name}
              className="w-90 h-64 object-cover rounded-lg mb-4 shadow-md"
            />
            <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
          </div>

          <div className="mt-6">
            {product.menu?.length ? (
              product.menu.map((item, j) => (
                <div key={j} className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800">{item.category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
                    {item.menuItem?.map((menuitem, k) => (
                      <div
                        key={k}
                        className="bg-gray-50 p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
                      >
                        <img
                          src={menuitem.productImage?.url || "/images/placeholder.jpg"} // Ensure this is a valid path
                          alt={menuitem.name}
                          className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                        />
                        <h4 className="text-lg font-semibold text-gray-800">{menuitem.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{menuitem.description}</p>
                        <p className="text-xl font-bold text-green-500">${menuitem.price}</p>
                        <SquarePlus onClick={ async() =>  await AddToCartHandler(menuitem)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No menu items available.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantDetail;
