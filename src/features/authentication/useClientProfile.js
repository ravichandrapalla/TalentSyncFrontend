import { useMutation, useQueryClient } from "react-query";
import { clientProfile as clientProfileApi } from "../../services/apiAuth";

export default function useClientProfile() {
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: clientProfileApi,
    onSuccess: ({ message, updatedRecord }) => {
      return { message, updatedRecord };
    },
    onError: ({ message }) => {
      return message;
    },
  });
  return { updateProfile, isLoading };
}
