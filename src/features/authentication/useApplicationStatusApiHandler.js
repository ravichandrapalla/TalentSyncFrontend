import { useMutation, useQueryClient } from "react-query";
import { updateClientApplicationStatus as updateClientApplicationStatusApi } from "../../services/apiAuth";
export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isLoading } = useMutation({
    mutationFn: updateClientApplicationStatusApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      return data;
    },
    onError: (err) => {
      return err;
    },
  });
  return { updateStatus, isLoading };
}
