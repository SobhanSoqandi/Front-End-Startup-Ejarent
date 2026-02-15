import { useQuery } from "@tanstack/react-query";
import { data } from "react-router-dom";
import { getCategoriesApi } from "../../services/categoryService";

export default function useGetCategories() {
    const {data , isError , error , isLoading} = useQuery({
        queryKey : ["categories"],
        queryFn : getCategoriesApi,
    });

    const categories = data?.data || [];

    return {isLoading , categories ,isError , error};
}