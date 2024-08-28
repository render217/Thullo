import { useQuery } from "@tanstack/react-query";
import { getUnsplashImage } from "../functions/getUnsplashImage";

// export function useGetUnsplashImage(query: string) {
//   return useQuery({
//     queryKey: ["coverImage", { query }],
//     queryFn: async () => await getUnsplashImage(query),
//     enabled: !!query,
//   });
// }
export const INITIAL_DATA = {};
export function useGetUnsplashImage(query: string) {
  return useQuery({
    queryKey: ["coverImage", query],
    queryFn: async () => await getUnsplashImage(query),
    enabled: !!query, // Ensures the query only runs when a valid query string is provided
    refetchOnWindowFocus: false, // Prevents refetching on window focus
    refetchOnReconnect: false, // Prevents refetching on network reconnect
    refetchOnMount: false, // Prevents refetching when component remounts
    refetchInterval: false, // Disables automatic polling
    staleTime: Infinity, // Cache the data indefinitely (react-query's max time)
    // cacheTime: Infinity, // Keep the data in the cache indefinitely

    // keepPreviousData: true, // Keeps the previous data while fetching new data
  });
}
