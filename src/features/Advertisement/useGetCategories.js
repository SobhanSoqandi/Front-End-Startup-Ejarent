import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "../../services/advService";
import { data } from "react-router-dom";

export default function useGetCategories() {
    const {data , isError , error , isLoading} = useQuery({
        queryKey : ["categories"],
        queryFn : getCategoriesApi,
    });

    const categories = data?.data || [];

    return {isLoading , categories ,isError , error};
}