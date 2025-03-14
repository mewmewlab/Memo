import { z } from "zod";
 
export const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(2).max(50),
  password_r: z.string().min(2).max(50),
});
 
export type FormSchema = typeof formSchema;