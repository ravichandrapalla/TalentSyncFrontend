import { useMutation } from "react-query";
import { dashBoard as dashBoardApi } from "../../services/apiAuth";

export function useDashBoard() {
  const { mutate: dashboard, isLoading } = useMutation({
    mutationFn: dashBoardApi,
    onSuccess: ({ message, records }) => {
      return { message, records };
    },
    onError: (err) => {
      return err;
    },
  });
  return { dashboard, isLoading };
}
