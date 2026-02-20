import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAttributesApi,
    createAttributeApi,
    updateAttributeApi,
    deleteAttributeApi
} from "../../services/attributeService";
import toast from "react-hot-toast";

const actions = {
    get: {
        queryFn: getAttributesApi,
        queryKey: ["attributes"],
    },
    create: {
        mutationFn: createAttributeApi,
        successMessage: "ویژگی با موفقیت اضافه شد",
        errorMessage: "خطا در افزودن ویژگی",
        invalidateKey: ["attributes"],
    },
    update: {
        mutationFn: updateAttributeApi,
        successMessage: "ویژگی با موفقیت ویرایش شد",
        errorMessage: "خطا در ویرایش ویژگی",
        invalidateKey: ["attributes"],
    },
    delete: {
        mutationFn: deleteAttributeApi,
        successMessage: "ویژگی با موفقیت حذف شد",
        errorMessage: "خطا در حذف ویژگی",
        invalidateKey: ["attributes"],
    },
};

export function useAttributes(action = "get") {
    const queryClient = useQueryClient();
    const config = actions[action];

    if (action === "get") {
        const query = useQuery({
            queryKey: config.queryKey,
            queryFn: config.queryFn,
        });

        return {
            attributes: query.data?.data || [],
            isLoading: query.isLoading,
            isError: query.isError,
            error: query.error,
        };
    }

    const mutation = useMutation({
        mutationFn: config.mutationFn,
        onSuccess: (data) => {
            toast.success(data?.message || config.successMessage);
            queryClient.invalidateQueries({ queryKey: config.invalidateKey });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || config.errorMessage);
        },
    });

    return {
        create: { createAttribute: mutation.mutate, isCreating: mutation.isPending },
        update: { updateAttribute: mutation.mutate, isUpdating: mutation.isPending },
        delete: { deleteAttribute: mutation.mutate, isDeleting: mutation.isPending },
    }[action];
}
