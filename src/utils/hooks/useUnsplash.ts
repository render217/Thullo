import { useQuery } from "@tanstack/react-query";
import { getUnsplashImage } from "../functions/getUnsplashImage";

export function useGetUnsplashImage(query: string) {
  return useQuery({
    queryKey: ["coverImage", { query }],
    queryFn: async () => await getUnsplashImage(query),
    enabled: !!query,
  });
}
