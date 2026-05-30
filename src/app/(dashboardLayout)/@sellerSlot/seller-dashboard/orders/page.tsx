"use client";

import { getSellerOrders } from "@/app/actions/seller.action";

import { useEffect, useState } from "react";

import NoOrdersState from "@/components/ui/NoOrderState";

import OrdersTable from "@/components/modules/dashboard/seller/OrderTable";
import { Order } from "@/types";

export default function page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true); // শুরুতে লোডিং ট্রু থাকবে

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // ডাটা আনা শুরুর আগে লোডিং স্টার্ট
        const { data } = await getSellerOrders();
        setOrders(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // ডাটা আসুক বা এরর হোক, লোডিং শেষ
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <p className="text-slate-500 animate-pulse">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return <NoOrdersState />;
  }
  return <OrdersTable />;
}
