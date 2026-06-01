import { env } from "@/env";

export const cartService = {
  addToCart: async (payload: {
    id: string;
    guest_id?: string;
    user_id?: string;
    quantity: number;
  }) => {
    try {
      const result = fetch(`${env.BACKEND_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      return (await result).json();
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch carts", details: error },
      };
    }
  },
  getCartItems: async (payload: { user_id?: string; guest_id?: string }) => {
    try {
      const res = await fetch(
        `${env.BACKEND_URL}/api/cart?guest_id=${payload.guest_id}`,
        { cache: "no-store" },
      );
      const { data } = await res.json();
      return data;
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch carts", details: error },
      };
    }
  },

  updateCartQuantity: async (cart_id: string, quantity: number) => {
    try {
      const res = await fetch(`${env.BACKEND_URL}/api/cart/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id, quantity }), // সরাসরি সংখ্যা পাঠাচ্ছি
      });
      return await res.json();
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to update quantities", details: error },
      };
    }
  },

  deleteCartItem: async (id: string) => {
    try {
      // console.log("guest id from client service delete single data: ", id);
      const res = await fetch(`${env.BACKEND_URL}/api/cart/delete/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });
      return await res.json();
    } catch (err: any) {
      return {
        data: null,
        error: { message: "Failed to update quantities", details: err },
      };
    }
  },

  deleteAll: async (payload: { guest_id: string }) => {
    try {
      // console.log("guest id from client service: ", payload);
      const res = await fetch(`${env.BACKEND_URL}/api/cart/delete`, {
        method: "DELETE",
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      return await res.json();
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to update quantities", details: error },
      };
    }
  },
};
