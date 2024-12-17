'use client';

import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div>
        <h1 className="text-3xl font-bold text-orange-500">FOOD CART</h1>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="py-2 pl-10 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <Search size={24} className="absolute left-3 top-3 text-gray-500" />
      </div>

      {isSignedIn ? (

        <div className="flex gap-4">
          <div className="flex items-center justify-center gap-4">
            <ShoppingCart size={24} className= "  text-orange-500 items-center" />
            <label className= " text-orange-500 items-center" >0</label>
          </div>
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