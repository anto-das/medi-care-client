import { env } from "@/env";
import { cookies } from "next/headers";
import { cache } from "react";

export const userService = {
  getSession: cache(async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.AUTH_BASE_URL}/get-session`, {
        method: "GET",
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      // console.log(res)
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
  }),
};
