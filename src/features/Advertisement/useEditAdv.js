import { useQueryClient } from "@tanstack/react-query";
import { editAdvertisementApi } from "../../services/advService";

export default function useEditAdv() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editAdv } = useMutation({
    mutationFn: editAdvertisementApi,
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["my-advertisement"],
      });
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message),
  });

  return { isEditing, editAdv };
}
