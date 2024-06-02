import React from "react";
import { useQuery } from "react-query";
import { getJobApplicationsForRecruiter } from "../../services/apiAuth";

export default function useJobApplications() {
  const {
    data: jobApplicationsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Job-applications-recruiter"],
    queryFn: getJobApplicationsForRecruiter,
  });
  return { jobApplicationsData, isLoading, error };
}

/*export function useGetJobApplicationsApiHandler() {
  console.log("happening");
  const {
    data: jobApplications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job-applications"],
    queryFn: getJobApplicationsApi,
  });
  console.log("handler data --> ", jobApplications, isLoading, error);
  return { jobApplications, isLoading, error };
}
*/
