import { useQuery } from "@tanstack/react-query";
import { getAllAdvertisementApi } from "../../services/advService";

export default function useGetAdv(filters = {}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["advertisement", filters],
    queryFn: () => getAllAdvertisementApi(filters),
    keepPreviousData: true,
  });

  return {
    advertisements: data?.data || [],
    isLoading,
    isError,
  };
}
