import React, { useEffect, useState } from "react";
import { getOrders } from "../../service/api";
import OrderTable from "../Pages/OrderTable";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getOrders();
      console.log("Fetched orders:", res.data); 
      
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  fetchData();
}, []);


  return (
    <div>
      <OrderTable orders={orders} />
    </div>
  );
};

export default OrdersPage;
