'use client';

import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import Header from "/app/_components/Header";

import { CartUpdateContext } from "/app/_context/CartUpdateContext";

const Provider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);

  return (
    <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
      <div>
        <Header />
        <Toaster />
        {children}
      </div>
    </CartUpdateContext.Provider>
  );
};

export default Provider;
