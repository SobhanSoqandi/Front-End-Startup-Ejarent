import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAdvertisementApi } from "../../services/advService";

export default function useDeleteMyAdv() {
    const queryClient = useQueryClient();
    
    const { mutateAsync: deleteAdv, isLoading: isDeleting } = useMutation({
        mutationFn: deleteAdvertisementApi,
        onSuccess: () => {
            toast.success("آگهی با موفقیت حذف شد");
            queryClient.invalidateQueries(["advertisement"]);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "خطا در حذف آگهی");
        }
    });

    return { deleteAdv, isDeleting };
}