import { createEnv } from "@t3-oss/env-nextjs"; // or core package
import * as z from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.url(),
    AUTH_BASE_URL: z.url(),
  },
  client: {
    NEXT_PUBLIC_HOSTING_IMG_KEY: z.string(),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    AUTH_BASE_URL: process.env.NEXT_PUBLIC_AUTH_BASE_URL,
    NEXT_PUBLIC_HOSTING_IMG_KEY: process.env.NEXT_PUBLIC_HOSTING_IMG_KEY,
  },
});
