import { cookies } from "next/headers";

export const userService = () => {
  getSession: async () => {
    try {
      const cookieStore = await cookies();
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch user session", details: error },
      };
    }
  };
};
