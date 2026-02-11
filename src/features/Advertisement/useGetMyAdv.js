
import { useQuery } from "@tanstack/react-query";
import { getMyAdvertisementApi } from "../../services/advService";



export default function useGetMyAdv() {
    const { data , isError , error , isLoading , refetch  } = useQuery({
        queryKey : ["advertisement"],
        queryFn : getMyAdvertisementApi,
    });

     const myadvertisements = data?.data || [];

    return {  isLoading , myadvertisements, isError , error, refetch  };

}