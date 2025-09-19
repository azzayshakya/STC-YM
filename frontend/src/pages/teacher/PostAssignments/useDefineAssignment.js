import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssignmentSchema } from "./AssignmentsValidation";

export const useDefineAssignmentForm = () => {
  const form = useForm({
    resolver: zodResolver(AssignmentSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      deadline: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  return { form, errors };
};
