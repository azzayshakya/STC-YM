import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAccountFormSchema } from "../constants/CreateAccountValidation";

export const useDefineCreateAccountForm = () => {
  const form = useForm({
    resolver: zodResolver(CreateAccountFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      userType: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  return { form, errors };
};
