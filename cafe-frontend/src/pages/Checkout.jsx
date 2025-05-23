import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Button } from "@/components/ui/button";

const paymentOptions = ["Cash"];

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const cart = state?.cart || [];

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = () => {
    alert(`Order placed with ${paymentMethod}`);
    navigate("/");
  };

  //   const handleSubmit = async () => {
  //   try {
  //     await axios.post("/api/order", {
  //       items: cart.map(item => item._id),
  //       tableNumber: "A1", // later from QR
  //       paymentMethod
  //     });
  //     alert("Order placed!");
  //     navigate("/");
  //   } catch (err) {
  //     alert("Order failed");
  //     console.error(err);
  //   }
  // };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🧾 Checkout</h2>

      <ul className="mb-4 space-y-2">
        {cart.map((item) => (
          <li key={item._id} className="flex justify-between">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </li>
        ))}
      </ul>

      <p className="font-semibold mb-4">Total: ₹{total}</p>

      <h3 className="font-semibold mb-2">Select Payment Method:</h3>
      <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
        <div className="space-y-2">
          {paymentOptions.map((option) => (
            <RadioGroup.Option
              key={option}
              value={option}
              className={({ checked }) =>
                `cursor-pointer p-2 border rounded ${
                  checked ? "bg-blue-100 border-blue-500" : "border-gray-300"
                }`
              }
            >
              {option}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <Button onClick={handleSubmit} className="mt-6 w-full">
        Confirm Order
      </Button>
    </div>
  );
}
