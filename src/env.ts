import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_URL: z.string().url().optional().default('http://localhost'),
  PORT: z.coerce.number().optional().default(3333)
})

export type Env = z.infer<typeof envSchema>