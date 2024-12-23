import { RemoveFromCart } from "@/app/_utlis/GlobalApi"; 

export const Cart = ({ cart , setCart }) => {


        const CalculateAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total +item.price;
    });
    return total;
  };

  const removeFromCart = async (id) => {
    try {
      const res = await RemoveFromCart(id);
      if (res) {
        console.log("Item removed from cart:", id);

        // Update the cart state locally
        // const updatedCart = cart.filter((item) => item.id !== id);
        setCart(res); // Update the UI to reflect the change
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };


    return (
      <div className="relative">
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-72 max-h-80 overflow-y-auto border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 p-4 border-b">Your Cart Items</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center p-4">Your cart is empty!</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-50 border-b p-4"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700">{item.productName}</h3>
                    <p className="text-xs text-gray-500">Price: ${item.price}</p>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <span  onClick={() => removeFromCart(item.id)}
                
                  className="text-red-500 cursor-pointer text-lg font-bold hover:text-red-700 transition">
                    ✖
                  </span>
                </div>
              ))}
            </div>
          )}
          {cart.length > 0 && (
            <button className="w-full bg-green-500 text-white py-2 font-semibold rounded-b-lg hover:bg-green-600 transition">
              Checkout - ${CalculateAmount()}
            </button>
          )}
        </div>
      </div>
    );
  };
  