import { toast } from "sonner";
import { addCart } from "../actions/cart.action";

export const handleAddToCart = async (id: string, quantity: number) => {
  const guest_id = localStorage.getItem("guest_id");
  const toastId = toast.loading("added");
  try {
    const res = await addCart({
      id: id,
      guest_id: guest_id as string,
      quantity,
    });
    toast.success(res.message, { id: toastId });
  } catch (error: any) {
    toast.error(error.message, { id: toastId });
  }
};
