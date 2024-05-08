import { useMutation } from "react-query";
import { updateClientApplicationStatus as updateClientApplicationStatusApi } from "../../services/apiAuth";
export function useUpdateStatus() {
  const { mutate: updateStatus, isLoading } = useMutation({
    mutationFn: updateClientApplicationStatusApi,
    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      return err;
    },
  });
  return { updateStatus, isLoading };
}
