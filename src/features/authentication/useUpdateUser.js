import { useMutation } from "react-query";
import { editUser as editUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: editUserApi,

    onSuccess: ({ message, updatedRecord }) => {
      return { message, updatedRecord };
    },
    onError: (err) => {
      return err;
    },
  });
  return { updateUser, isLoading };
}
