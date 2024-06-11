import { useMutation, useQuery } from "react-query";
import { getCurrentUserUpdatedDetails as getCurrentUserUpdatedDetailsApi } from "../../services/apiAuth";

export default function useUserUpToDateDetails() {
  // const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["userDetails"],
    queryFn: getCurrentUserUpdatedDetailsApi,
  });
  console.log("lllllllllllllllllllll ---> ", data, isLoading);
  return { data, isLoading, error };
}

/** "userDetails",
    getCurrentUserUpdatedDetailsApi,
    {
      onError: ({ message }) => {
        return message;
      },
      onSuccess: (data) => {
        return data;
      },
    } */
