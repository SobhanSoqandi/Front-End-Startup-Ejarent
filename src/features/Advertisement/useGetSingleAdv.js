import { useQuery } from "@tanstack/react-query";
import { getSingleAdvertisementApi } from "../../services/advService";


export default function useGetSingleAdv(id) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["single-adv", id],
    queryFn: () => getSingleAdvertisementApi(id),
    enabled: !!id,
  });

  return {
    singleAdv: data?.data || null,
    isLoading,
    isError,
  };
}