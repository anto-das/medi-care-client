"use client";

import {
  deleteAllCart,
  deleteCartItem,
  getCart,
  updateCartQuantity,
} from "@/app/actions/cart.action";
import { authClient } from "@/lib/auth-client";
import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import CartItemCard from "@/components/ui/cartItemCard";

import Link from "next/link";
import CheckOutAside from "@/components/ui/CheckOutAside";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";
import EmptyCart from "@/components/ui/emptyCart";
import Loading from "@/components/ui/loading";
import { useCart } from "@/hooks/MedicineContext";

// Types definition for better DX

const CartPage = () => {
  const { data: session } = authClient.useSession();
  const user_id = session?.user.id;

  const { carts, setCarts, loading, guest_id } = useCart();

  const [isMounted, setIsMounted] = useState(false);

  // 2. useEffect diye Browser Mount Complete Tracker Active Korun
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [pendingUpdate, setPendingUpdate] = useState<{
    cart_id: string;
    quantity: number;
  } | null>(null);

  const debouncedCarts = useDebounce(carts, 700);
  const handleQuantityChange = async (cart_id: string, action: string) => {
    setCarts((prevCarts) =>
      prevCarts.map((item) => {
        if (item.cart_id === cart_id) {
          const currentQty = (item as any).quantity || 1;
          const newQty =
            action === "increment"
              ? currentQty + 1
              : Math.max(1, currentQty - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );

    // সার্ভারে ডাটা পাঠানো
    const item = carts.find((item) => (cart_id === item.cart_id ? item : null));
    const quantity =
      action === "increment"
        ? (item?.quantity as number) + 1
        : Math.max(1, (item?.quantity as number) - 1);
    setPendingUpdate({ cart_id: cart_id, quantity: quantity });
  };

  // update quantity useEffect
  useEffect(() => {
    if (debouncedCarts?.length > 0) {
      updateCartQuantity(
        pendingUpdate?.cart_id as string,
        pendingUpdate?.quantity as number,
      );
    }
  }, [debouncedCarts]);

  const handleDeleteItem = async (id: string) => {
    const toastId = toast.loading("deleting item");
    try {
      const payload = { user_id: user_id, guest_id: guest_id as string };
      const deleteRes = await deleteCartItem(id);
      toast.success(deleteRes.message, { id: toastId });
      const res = await getCart(payload);
      setCarts(res);
    } catch (error: any) {
      toast.error("failed to delete..", { id: toastId });
    }
  };

  const handleDeleteAll = async (guest_id: string) => {
    const toastId = toast.loading("deleting item");
    const payload = { guest_id: guest_id as string };
    try {
      if (guest_id || user_id) {
        const delAll = await deleteAllCart(payload);
        delAll.success && toast.success(delAll.message, { id: toastId });
        const res = await getCart(payload);
        setCarts(res);
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  // Calculations
  const subtotal = useMemo(() => {
    return (
      carts?.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0,
      ) || 0
    );
  }, [carts]);

  const deliveryFee = carts?.length > 0 ? 60 : 0;
  const discount = carts?.length > 0 ? 25 : 0;
  const total = subtotal + deliveryFee - discount;

  if (!isMounted) {
    return <Loading />;
  }

  if (loading) {
    return <Loading />;
  }

  if (carts?.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="bg-[#F9FAFB] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-[#111827] tracking-tight">
            My Cart
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            You have {carts.length} items in your basket
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* List of Items */}
          <section className="lg:col-span-8 space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4 text-blue-800 shadow-sm">
              <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                Note
              </div>
              <p className="text-sm font-medium">
                Prescription might be required for some items in your cart.
              </p>
            </div>

            <div className="space-y-4">
              {carts.map((item) => (
                <CartItemCard
                  key={item.cart_id}
                  handleQuantityChange={handleQuantityChange}
                  handleDeleteItem={handleDeleteItem}
                  item={item}
                />
              ))}
            </div>

            <div className="flex justify-between items-center pt-6">
              <Link
                href={"/medicine"}
                className="text-gray-500 font-bold hover:text-gray-800 transition-colors flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">
                  ←
                </span>{" "}
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  handleDeleteAll(guest_id as string);
                }}
                className="text-red-400 font-bold hover:text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Trash2 size={18} /> Clear Cart
              </button>
            </div>
          </section>

          {/* Checkout Section */}
          <CheckOutAside
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
          />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
