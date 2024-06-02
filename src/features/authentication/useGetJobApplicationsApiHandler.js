import { useMutation, useQuery } from "react-query";
import { getJobApplications as getJobApplicationsApi } from "../../services/apiAuth";

export function useGetJobApplicationsApiHandler(jobId) {
  console.log("happening");
  const {
    data: jobApplications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job-applications", jobId],
    queryFn: () => getJobApplicationsApi(jobId),
  });
  console.log("handler data --> ", jobApplications, isLoading, error);
  return { jobApplications, isLoading, error };
}
