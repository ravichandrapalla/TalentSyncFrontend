import { useMutation } from "react-query";
import { applyJobPosting as applyJobPostingApi } from "../../services/apiAuth";
export function useApplyJobPostingApiHandler() {
  const { mutate: applyJob, isLoading } = useMutation({
    mutationFn: (jobId) => applyJobPostingApi(jobId),
    onSuccess: ({ message }) => {
      return message;
    },
    onError: (err) => {
      return err;
    },
  });
  return { applyJob, isLoading };
}
