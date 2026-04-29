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
      const url = new URL(`${env.BACKEND_URL}/api/cart`);
      if (payload) {
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      console.log("url: ", url.toString());

      const res = await fetch(url.toString());
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
    const res = await fetch(`${env.BACKEND_URL}/api/cart/delete/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  },
  deleteAll: async (payload: { guest_id: string; user_id?: string }) => {
    const res = await fetch(`http://localhost:5000/api/cart/delete`, {
      method: "DELETE",
      body: JSON.stringify(payload),
    });
    return await res.json();
  },
};
