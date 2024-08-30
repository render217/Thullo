import { create } from "zustand";
type PreviewUnsplashImage = {
  selectedImage: string | "";
  setSelectedImage: (url: string) => void;
};
export const usePreviewUnsplashImage = create<PreviewUnsplashImage>((set) => ({
  selectedImage: "",
  setSelectedImage: (url: string) => set({ selectedImage: url }),
}));
