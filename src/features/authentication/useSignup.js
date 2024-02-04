/* eslint-disable no-unused-vars */
import { useMutation } from "react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.toString());
    },
  });

  return { signup, isLoading };
}
