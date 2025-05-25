import { useEffect, useState } from "react";
import axios from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function AdminIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ name: "", unit: "gm" });
  const [stockInputs, setStockInputs] = useState({});

  const fetchIngredients = async () => {
    const res = await axios.get("/ingredients");
    // console.log(res.data);
    setIngredients(res.data);
  };

  useEffect(() => { fetchIngredients(); }, []);

  const addIngredient = async () => {
    await axios.post("/ingredients/add", newIngredient);
    setNewIngredient({ name: "", unit: "gm" });
    fetchIngredients();
  };

  const addStock = async (id) => {
    const { quantity, pricePerUnit } = stockInputs[id];
    await axios.put(`/ingredients/${id}/add-stock`, { quantity: +quantity, pricePerUnit: +pricePerUnit });
    setStockInputs((prev) => ({ ...prev, [id]: { quantity: "", pricePerUnit: "" } }));
    fetchIngredients();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧾 Ingredient Management</h2>

      {/* Add new ingredient */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-2">Add Ingredient</h3>
        <div className="grid grid-cols-3 gap-4">
          <Input
            placeholder="Ingredient Name"
            value={newIngredient.name}
            onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
          />
          <Select
            value={newIngredient.unit}
            onValueChange={(value) => setNewIngredient({ ...newIngredient, unit: value })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="gm">gm</SelectItem>
              <SelectItem value="ml">ml</SelectItem>
              <SelectItem value="pcs">pcs</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addIngredient}>Add</Button>
        </div>
      </div>

      {/* Ingredient list */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Ingredients List</h3>
        {ingredients?.map((ingredient) => (
          <div key={ingredient._id} className="mb-4 border p-4 rounded">
            <p className="font-semibold">{ingredient.name} ({ingredient.unit})</p>
            <p>Stock: {ingredient.stock}</p>

            <div className="grid grid-cols-3 gap-4 mt-2">
              <Input
                type="number"
                placeholder="Quantity"
                value={stockInputs[ingredient._id]?.quantity || ""}
                onChange={(e) =>
                  setStockInputs(prev => ({
                    ...prev,
                    [ingredient._id]: {
                      ...prev[ingredient._id],
                      quantity: e.target.value
                    }
                  }))
                }
              />
              <Input
                type="number"
                placeholder="Price/Unit"
                value={stockInputs[ingredient._id]?.pricePerUnit || ""}
                onChange={(e) =>
                  setStockInputs(prev => ({
                    ...prev,
                    [ingredient._id]: {
                      ...prev[ingredient._id],
                      pricePerUnit: e.target.value
                    }
                  }))
                }
              />
              <Button onClick={() => addStock(ingredient._id)}>Add Stock</Button>
            </div>

            <div className="mt-2 text-sm text-gray-600">
              <p className="font-medium">Price History:</p>
              <ul className="list-disc ml-5">
                {ingredient.priceHistory.map((ph, idx) => (
                  <li key={idx}>
                    {ph.quantity} @ ₹{ph.pricePerUnit} on {new Date(ph.addedAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
