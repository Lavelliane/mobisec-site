import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { env } from "@/env";
import * as schema from "@/db/auth-schema";
 
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }), 
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    },
  },
});

export type Session = typeof auth.$Infer.Session