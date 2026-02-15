export function useCreateCategory() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: createCategoryApi,
        onSuccess: (data) => {
            toast.success(data?.message || "دسته‌بندی با موفقیت اضافه شد");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "خطا در افزودن دسته‌بندی");
        }
    });

    return { createCategory: mutate, isCreating: isPending };
}