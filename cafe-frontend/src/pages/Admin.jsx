import { useEffect } from "react";
import api from "../api";
import { useSelector, useDispatch } from "react-redux";
export default function Admin() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  
  async function protectedRoute() {
    const res = await api("/protected-route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    
    const data = await res.data;
    console.log(data);
  }
  if(!token){
    
  }
  useEffect(() => {
    protectedRoute()
  }, []);
  return <div className="p-6">🛠️ Admin Panel</div>;
}
