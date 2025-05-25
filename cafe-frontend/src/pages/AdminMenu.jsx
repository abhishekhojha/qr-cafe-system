import { useEffect, useState } from "react";
import axios from "../api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AdminMenu() {
  const [ingredients, setIngredients] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", ingredients: [] });

  useEffect(() => {
    const fetchData = async () => {
      const ingRes = await axios.get("/ingredients");
      const menuRes = await axios.get("/menu");
      setIngredients(ingRes.data);
      setMenuItems(menuRes.data);
    };
    fetchData();
  }, []);

  const handleAddIngredient = () => {
    setNewItem({
      ...newItem,
      ingredients: [...newItem.ingredients, { ingredientId: "", quantityRequired: "" }],
    });
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...newItem.ingredients];
    updated[index][field] = value;
    setNewItem({ ...newItem, ingredients: updated });
  };

  const createMenuItem = async () => {
    await axios.post("/menu", newItem);
    setNewItem({ name: "", ingredients: [] });
    const res = await axios.get("/api/menu");
    setMenuItems(res.data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🍔 Menu Management</h2>

      {/* Create Menu Item */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">Add Menu Item</h3>
        <Input
          placeholder="Item Name"
          className="mb-2"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        {newItem.ingredients.map((ing, index) => (
          <div key={index} className="grid grid-cols-2 gap-2 mb-2">
            <select
              value={ing.ingredientId}
              onChange={(e) => handleIngredientChange(index, "ingredientId", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Ingredient</option>
              {ingredients.map((ing) => (
                <option key={ing._id} value={ing._id}>
                  {ing.name}
                </option>
              ))}
            </select>
            <Input
              type="number"
              placeholder="Qty Required"
              value={ing.quantityRequired}
              onChange={(e) => handleIngredientChange(index, "quantityRequired", e.target.value)}
            />
          </div>
        ))}
        <Button variant="outline" onClick={handleAddIngredient}>Add Ingredient</Button>
        <Button className="ml-2" onClick={createMenuItem}>Create</Button>
      </div>

      {/* List Menu Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Menu Items</h3>
        {menuItems.map((item) => (
          <div key={item._id} className="border p-4 rounded mb-3">
            <p className="font-semibold">{item.name}</p>
            <ul className="ml-4 list-disc text-sm">
              {item.ingredients.map((i, idx) => (
                <li key={idx}>
                  {i.ingredientId.name} – {i.quantityRequired} {i.ingredientId.unit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
