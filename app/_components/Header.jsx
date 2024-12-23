"use clint";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useContext, useEffect } from "react";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import { GetUserCart } from "@/app/_utlis/GlobalApi";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Cart} from "@/app/_components/Cart";


const Header = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);

  const FetchUserCart = async () => {
    const email = user?.primaryEmailAddress?.emailAddress?.trim();
    console.log("Fetching cart for email:", email);
  
    if (!email) {
      console.error("Email is not defined or empty!");
      return;
    }
  
    try {
      const cartData = await GetUserCart(email);
      setCart(cartData.userCarts);  
      
      if (!cartData || cartData.userCarts.length === 0) {
        console.warn("No cart data found for the provided email:", email);
      } else {
        console.log("Fetched User Cart Data:", cartData);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error.message, error.stack);
    }
  };
  
  useEffect(() => {
    if (user) {
      console.log("Executing FetchUserCart...");
      FetchUserCart();
    }
  }, [updateCart, user]);
  
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center py-4 px-8  bg-white shadow-md">
      <div>
        <h1 className="text-3xl font-bold text-orange-500">FOOD CART</h1>
      </div>
      <div className="flex items-center gap-2 relative">
        <input
          type="text"
          placeholder="Search"
          className="py-2 pl-10 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <Search size={24} className="absolute left-3 top-2 text-gray-500" />
      </div>

      {isSignedIn ? (
        <div className="flex gap-4">
          <Popover>
              <PopoverTrigger asChild>

               <div className="flex items-center justify-center gap-4">
                <ShoppingCart size={24} className="text-orange-500 items-center cursor-pointer  " />
                  <label className="bg-slate-500 text-orange-600 rounded-full px-3 py-1 text-sm font-semibold">
                 {cart?.length}
                  </label>
                   </div>
                </PopoverTrigger>
                <PopoverContent className="bg-white shadow-md rounded-lg p-4">
                  <Cart cart={cart}  setcart={setCart} />
                </PopoverContent>
{/* 
                <Cart  cart={cart}/>  */}

              </Popover>

          
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-4">
          <SignInButton mode="modal">
            <Button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              LOG IN
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              SIGN UP
            </Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
};

export default Header;
