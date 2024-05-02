import { useMutation } from "react-query";
import { getJobPostings as getJobPostingsApi } from "../../services/apiAuth";
import JobPostings from "../../pages/JobPostings";

export function useGetJobPostingsApiHandler() {
  const { mutate: getJobPostings, isLoading } = useMutation({
    mutationFn: getJobPostingsApi,
    onSuccess: ({ message, jobPosts }) => {
      return { message, jobPosts };
    },
    onError: (err) => {
      return err;
    },
  });
  return { getJobPostings, isLoading };
}
