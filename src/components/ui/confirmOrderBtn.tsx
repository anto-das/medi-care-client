"use client";

import { Order } from "@/types";
import { Button } from "./button";
import { toast } from "sonner";
import { updateOrderStatus } from "@/app/actions/seller.action";

const ConfirmOrderBtn = ({ order }: { order: Order }) => {
  console.log(order);
  const handleConfirmOrder = async (id: string) => {
    // const toastId = toast.loading("confirming order...");
    console.log(id);
    try {
      const { data, error } = await updateOrderStatus(id);
      console.log(data);
    } catch (err: any) {
      toast.error(err.message || "order not confirm");
      console.log(err);
    }
  };
  return (
    <Button
      onClick={() => handleConfirmOrder(order?.order_id)}
      size="sm"
      className="bg-[#0b5e4e] hover:bg-[#084a3d] px-6 font-bold shadow-md"
    >
      Confirm
    </Button>
  );
};

export default ConfirmOrderBtn;
