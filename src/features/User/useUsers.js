import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUsersApi,
    deleteUserApi
} from "../../services/userService";
import toast from "react-hot-toast";

// مپ کردن اکشن به API و پیغام‌ها
const actions = {
    getAll: {
        queryFn: getUsersApi,
        queryKey: ["users"],
        successMessage: null,
    },
    delete: {
        mutationFn: deleteUserApi,
        successMessage: "کاربر با موفقیت حذف شد",
        errorMessage: "خطا در حذف کاربر",
        invalidateKey: ["users"],
    }
};

// هوک اصلی
export function useUsers(action = "getAll") {
    const queryClient = useQueryClient();
    const config = actions[action];

    // برای GET ALL
    if (action === "getAll") {
        const query = useQuery({
            queryKey: config.queryKey,
            queryFn: config.queryFn,
        });

        return {
            users: query.data?.data || [],
            isLoading: query.isLoading,
            isError: query.isError,
            error: query.error,
            refetch: query.refetch,
        };
    }

    // برای DELETE
    const mutation = useMutation({
        mutationFn: config.mutationFn,
        onSuccess: (data) => {
            toast.success(data?.message || config.successMessage);
            queryClient.invalidateQueries({ queryKey: config.invalidateKey });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || config.errorMessage);
        }
    });

    return {
        deleteUser: mutation.mutate,
        isDeleting: mutation.isPending,
    };
}