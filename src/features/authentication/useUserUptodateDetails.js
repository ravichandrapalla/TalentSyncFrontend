import { useMutation, useQuery } from "react-query";
import { getCurrentUserUpdatedDetails as getCurrentUserUpdatedDetailsApi } from "../../services/apiAuth";

export default function useUserUpToDateDetails() {
  // const queryClient = useQueryClient();
  const { mutate: getUptoDateDetails, isLoading } = useMutation({
    mutationFn: getCurrentUserUpdatedDetailsApi,
    onSuccess: ({ message, updatedRecord }) => {
      return updatedRecord;
    },
    onError: ({ message }) => {
      return message;
    },
  });
  return { getUptoDateDetails, isLoading };
  // const {
  //   isLoading,
  //   error,
  //   updatedRecord: data,
  // } = useQuery({
  //   queryKey: ["userData"],
  //   queryFn: getCurrentUserUpdatedDetailsApi,
  // });
  // return { isLoading, error, data };
}
