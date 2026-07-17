import { toast } from "sonner";
import { addCart, getCart } from "../actions/cart.action";
import { useCart } from "@/hooks/MedicineContext";

export const handleAddToCart = async (
  id: string,
  quantity: number,
  setCarts: any,
  user_id: string,
  guest_id_from_context: string,
) => {
  const guest_id = localStorage.getItem("guest_id");
  const toastId = toast.loading("added");
  try {
    const res = await addCart({
      id: id,
      guest_id: guest_id as string,
      quantity,
    });
    toast.success(res.message, { id: toastId });
    const payload = { user_id: user_id, guest_id: guest_id_from_context };
    const updatedCart = await getCart(payload);
    setCarts(updatedCart);
  } catch (error: any) {
    toast.error(error.message, { id: toastId });
  }
};
