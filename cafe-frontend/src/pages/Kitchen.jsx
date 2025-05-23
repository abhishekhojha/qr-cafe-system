import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "../api";
import { Button } from "@/components/ui/button";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    });
    return () => unsubscribe();
  }, []);

  const markDelivered = async (orderId) => {
    try {
      await axios.put(`/api/order/${orderId}/deliver`);
      alert("Order marked as delivered");
    } catch (err) {
      alert("Failed to update order");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">👨‍🍳 Kitchen Dashboard</h2>
      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4 rounded">
            <p>
              <strong>Table:</strong> {order.tableNumber}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Items:</strong>
            </p>
            <ul className="list-disc ml-6">
              {order.items.map((item, idx) => (
                <li key={idx}>{item}</li> // ideally fetch item names by ID later
              ))}
            </ul>
            {order.status !== "Delivered" && (
              <Button className="mt-2" onClick={() => markDelivered(order.id)}>
                Mark Delivered
              </Button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
