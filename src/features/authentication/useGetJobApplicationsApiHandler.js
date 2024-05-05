import { useMutation } from "react-query";
import { getJobApplications as getJobApplicationsApi } from "../../services/apiAuth";

export function useGetJobApplicationsApiHandler() {
  const { mutate: getJobApplications, isLoading } = useMutation({
    mutationFn: getJobApplicationsApi,
    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      return err;
    },
  });
  return { getJobApplications, isLoading };
}
