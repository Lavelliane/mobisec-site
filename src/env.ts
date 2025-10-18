import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    AUTH_DRIZZLE_URL: z.string().url(),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),
    AUTH_KAKAO_ID: z.string().min(1),
    AUTH_KAKAO_SECRET: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    BASE_URL: z.string().url(),
    PORT: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    PROCEEDINGS_USERNAME: z.string().min(1),
    PROCEEDINGS_PASSWORD: z.string().min(1),
  },
  runtimeEnv: process.env,
});