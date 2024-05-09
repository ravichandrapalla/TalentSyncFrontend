import { useMutation, useQuery } from "react-query";
import { getJobApplications as getJobApplicationsApi } from "../../services/apiAuth";

export function useGetJobApplicationsApiHandler() {
  const {
    data: jobApplications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job-applications"],
    queryFn: getJobApplicationsApi,
  });
  return { jobApplications, isLoading, error };
}
