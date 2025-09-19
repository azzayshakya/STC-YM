import { z } from "zod";

export const AssignmentSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" }),
  subject: z.string().nonempty({ message: "Subject is required" }),
  deadline: z.string().nonempty({ message: "Deadline is required" }),
});
