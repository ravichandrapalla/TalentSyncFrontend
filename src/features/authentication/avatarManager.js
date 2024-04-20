import { useMutation } from "react-query";
import { updateUserAvatarApi } from "../../services/apiAuth";

export default function useAvatarManager() {
  // const queryClient = useQueryClient();
  const { mutate: updateUserAvatarManager, isLoading } = useMutation({
    mutationFn: updateUserAvatarApi,
    onSuccess: (data) => {
      return data;
    },
    onError: (message) => {
      return message;
    },
  });
  return { updateUserAvatarManager, isLoading };
}
