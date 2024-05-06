import { useMutation } from "react-query";
import { getClientJobApplications as getClientJobApplicationsApi } from "../../services/apiAuth";

export function useGetClientJobApplicationsApiHandler() {
  const { mutate: getClientJobApplications, isLoading } = useMutation({
    mutationFn: getClientJobApplicationsApi,
    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      return err;
    },
  });
  return { getClientJobApplications, isLoading };
}
