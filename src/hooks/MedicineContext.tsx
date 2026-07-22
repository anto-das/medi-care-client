"use client";
import { getCart } from "@/app/actions/cart.action";
import { authClient } from "@/lib/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  cart_id: string;
  medicine_id: string;
  medicine_name: string;
  generic_name: string;
  manufacturer: string;
  quantity: number;
  medi_img: string;
  price: string;
  category_name: string;
};

export const CartContext = createContext<{
  carts: CartItem[];
  setCarts: React.Dispatch<React.SetStateAction<CartItem[]>>;
  loading: boolean;
  guest_id: string;
  user_id: string;
  setGuestId: React.Dispatch<React.SetStateAction<string>>;
  fetchCart: () => Promise<void>;
}>({
  carts: [],
  setCarts: () => {},
  loading: true,
  guest_id: "",
  user_id: "",
  setGuestId: () => {},
  fetchCart: async () => {},
});

export const CartProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [carts, setCarts] = useState<CartItem[]>([]);
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(true);

  const user_id = session?.user.id as string;
  const [guest_id, setGuestId] = useState("");
  // get medicine useEffect
  const fetchCart = async () => {
    if (!guest_id && !user_id) return;
    try {
      const payload = { user_id: user_id, guest_id: guest_id as string };
      const res = await getCart(payload);

      setCarts(res);
      if (res) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };
  useEffect(() => {
    const localId = localStorage.getItem("guest_id") || "";
    setGuestId(localId);

    // Session load na hole ba guest id na thakle initial loading close korar jonno
    if (!localId && !user_id) {
      setLoading(false);
    }

    fetchCart();
  }, [guest_id, user_id]);
  return (
    <CartContext.Provider
      value={{
        carts,
        setCarts,
        loading,
        guest_id,
        user_id,
        setGuestId,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
