import { env } from "process";

export const cartService = {
  addToCart: async (id: string) => {
    try {
      const result = fetch(`${env.BACKEND_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      return (await result).json();
    } catch (error) {
      console.log(error);
    }
  },
};
