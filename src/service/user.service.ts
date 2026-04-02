import { cookies } from "next/headers";

export const userService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch("http://localhost:5000/api/auth/get-session", {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      if (data === null) {
        return { data: null, error: { message: "No active session found" } };
      }
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: { message: "Failed to fetch user session", details: error },
      };
    }
  },
};
