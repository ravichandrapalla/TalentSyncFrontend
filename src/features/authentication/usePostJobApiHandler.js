import { useMutation } from "react-query";
import { postJob as JobPostApi } from "../../services/apiAuth";
export function usePostJobApiHandler() {
  const { mutate: jobPost, isLoading } = useMutation({
    mutationFn: (jD) => JobPostApi(jD),
    onSuccess: (data) => {
      return data;
    },
    onError: (err) => {
      return err;
    },
  });
  return { jobPost, isLoading };
}
