import { z } from "zod";

export const CreateAccountFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" }),

  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" })
    .max(30, { message: "Password must be 30 characters long" }),
  userType: z.enum(["teacher", "student"], {
    errorMap: () => ({ message: "Please select a valid user type" }),
  }),
});
