import { useQuery } from "@tanstack/react-query";
import { getAllAdvertisementApi } from "../../services/advService";



export default function useGetAdv() {
    const { data , isError , error , isLoading , refetch  } = useQuery({
        queryKey : ["advertisement"],
        queryFn : getAllAdvertisementApi,
    });

     const advertisements = data?.data || [];

    return {  isLoading , advertisements, isError , error, refetch  };

}