import { useMutation } from "react-query";
import { revokeUserAccess as revokeUserAccessApi } from "../../services/apiAuth";

export function useRevokeUser() {
  const { mutate: revokeUser, isLoading } = useMutation({
    mutationFn: revokeUserAccessApi,
    onSettled: (data) => {
      return data;
    },
    onError: (err) => {
      return err;
    },
  });
  return { revokeUser, isLoading };
}
