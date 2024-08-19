import { api } from "@/lib/axios";

export const getUnsplashImage = async (queryKey: string) => {
  return api.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
    },
    params: {
      page: 1,
      query: queryKey ?? "",
    },
  });
};
