import { useMutation } from "react-query";
import { editUser as editUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: editUserApi,

    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { updateUser, isLoading };
}
