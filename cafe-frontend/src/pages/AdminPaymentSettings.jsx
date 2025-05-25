import { useEffect, useState } from "react";
import api from "../api";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AdminPaymentSettings() {
  const [methods, setMethods] = useState({
    cash: false,
    razorpay: false,
    stripe: false,
    upi: false,
  });

  useEffect(() => {
    api.get("/payment-methods").then((res) => {
      setMethods(res.data);
    });
  }, []);

  const toggle = (key) => {
    const updated = { ...methods, [key]: !methods[key] };
    setMethods(updated);
    axios.put("/api/settings/payment-methods", updated);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">⚙️ Payment Method Settings</h2>
      {Object.entries(methods).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between py-2">
          <Label className="capitalize">{key}</Label>
          <Switch checked={value} onCheckedChange={() => toggle(key)} />
        </div>
      ))}
    </div>
  );
}
