import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getCategoriesApi, 
    createCategoryApi, 
    updateCategoryApi, 
    deleteCategoryApi 
} from "../../services/categoryService";
import toast from "react-hot-toast";

// مپ کردن اکشن به API و پیغام‌ها
const actions = {
    get: {
        queryFn: getCategoriesApi,
        queryKey: ["categories"],
        successMessage: null,
    },
    create: {
        mutationFn: createCategoryApi,
        successMessage: "دسته‌بندی با موفقیت اضافه شد",
        errorMessage: "خطا در افزودن دسته‌بندی",
        invalidateKey: ["categories"],
    },
    update: {
        mutationFn: updateCategoryApi,
        successMessage: "دسته‌بندی با موفقیت ویرایش شد",
        errorMessage: "خطا در ویرایش دسته‌بندی",
        invalidateKey: ["categories"],
    },
    delete: {
        mutationFn: deleteCategoryApi,
        successMessage: "دسته‌بندی با موفقیت حذف شد",
        errorMessage: "خطا در حذف دسته‌بندی",
        invalidateKey: ["categories"],
    }
};

// هوک اصلی
export function useCategories(action = "get") {
    const queryClient = useQueryClient();
    const config = actions[action];

    // برای GET
    if (action === "get") {
        const query = useQuery({
            queryKey: config.queryKey,
            queryFn: config.queryFn,
        });

        return {
            categories: query.data?.data || [],
            isLoading: query.isLoading,
            isError: query.isError,
            error: query.error,
        };
    }

    // برای CREATE, UPDATE, DELETE
    const mutation = useMutation({
        mutationFn: config.mutationFn,
        onSuccess: (data) => {
            if (config.successMessage) {
                toast.success(data?.message || config.successMessage);
            }
            if (config.invalidateKey) {
                queryClient.invalidateQueries({ queryKey: config.invalidateKey });
            }
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || config.errorMessage);
        }
    });

    // برگردوندن داینامیک براساس اکشن
    const returns = {
        create: {
            createCategory: mutation.mutate,
            isCreating: mutation.isPending,
        },
        update: {
            updateCategory: mutation.mutate,
            isUpdating: mutation.isPending,
        },
        delete: {
            deleteCategory: mutation.mutate,
            isDeleting: mutation.isPending,
        }
    };

    return returns[action];
}