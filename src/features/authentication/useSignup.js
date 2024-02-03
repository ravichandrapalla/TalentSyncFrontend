/* eslint-disable no-unused-vars */
import { useMutation } from "react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
    onError: (error) => {
      toast.error(error.toString());
    },
  });

  return { signup, isLoading };
}
