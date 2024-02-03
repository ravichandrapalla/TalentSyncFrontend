import { useMutation, useQueryClient } from "react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  // const queryClient = useQueryClient();
  // const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (msg) => {
      // queryClient.setQueryData(["user"], user.user);
      // navigate("/dashboard", { replace: true });
      toast.success(msg);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.toString());
    },
  });
  return { login, isLoading };
}
