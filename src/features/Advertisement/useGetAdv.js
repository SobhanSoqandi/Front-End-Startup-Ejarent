import { useQuery } from "@tanstack/react-query";
import { getAllAdvertisementApi } from "../../services/advService";

// export default function useGetAdv(search) {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["advertisement", search],
//     queryFn: () => getAllAdvertisementApi(search),
//     keepPreviousData: true,
//   });

//   const advertisements = data?.data || [];

//   return { advertisements, isLoading, isError, error };
// }

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
