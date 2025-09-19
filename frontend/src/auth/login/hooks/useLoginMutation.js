import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/apis/apiServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "@/context/user.context";
import { useContext } from "react";

export const useLoginMutation = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    mutate: submitLoginMutation,
    isPending: isSubmitting,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const { token, user } = data;

      toast.success(`Welcome back 🎉`);
      localStorage.setItem("stcUserToken", token);

      const normalizedUser = {
        STCuser: user.username,
        STCuserEmail: user.email,
        STCuserType: user.userType,
      };

      localStorage.setItem("stcUser", JSON.stringify(normalizedUser));
      setUser(normalizedUser);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });

  return {
    submitLoginMutation,
    isSubmitting,
    isSuccess,
    isError,
    error,
  };
};
