import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
const dummyMenu = [
  {
    _id: "1",
    name: "Cheeseburger",
    description: "Beef patty, cheese, lettuce, tomato",
    price: 120,
  },
  {
    _id: "2",
    name: "Veg Sandwich",
    description: "Lettuce, tomato, cucumber, mint chutney",
    price: 80,
  },
  {
    _id: "3",
    name: "Cold Coffee",
    description: "Chilled coffee with cream",
    price: 60,
  },
];

export default function Customer() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   axios
  //     .get("/api/menu")
  //     .then((res) => setMenu(res.data))
  //     .catch((err) => console.error("Failed to fetch menu", err));
  // }, []);
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📋 Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyMenu.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="font-medium">₹{item.price}</p>
              <Button onClick={() => addToCart(item)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-8">🛒 Cart</h3>
      <ul className="mt-2 space-y-2">
        {cart.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>
              {item.name} — ₹{item.price}
            </span>
            <Button variant="outline" onClick={() => removeFromCart(item._id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">Total: ₹{total}</p>
          <Button
            className="mt-2"
            onClick={() => navigate("/checkout", { state: { cart } })}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
