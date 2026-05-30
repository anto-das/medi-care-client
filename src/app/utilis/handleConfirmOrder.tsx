import { toast } from "sonner";
import { deleteOrder, updateOrderStatus } from "../actions/seller.action";
import { orderStatus } from "@/types";

export const handleConfirmOrder = async (id: string, status: orderStatus) => {
  const toastId = toast.loading("confirming order...");
  // console.log(id);
  try {
    const { data, error } = await updateOrderStatus(id, status);
    toast.success(`ordered ${status} successfully..`, { id: toastId });
  } catch (err: any) {
    toast.error(err.message || "order not confirm", { id: toastId });
    console.log(err);
  }
};
export const handleDeleteOrder = async (id: string) => {
  const toastId = toast.loading("confirming order...");
  // console.log(id);
  try {
    const res = await deleteOrder(id);
    console.log(res);
    toast.success(`ordered deleted successfully..`, { id: toastId });
  } catch (err: any) {
    toast.error(err.message || "order not confirm", { id: toastId });
    console.log(err);
  }
};
