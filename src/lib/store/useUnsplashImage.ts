// create a zustand with that saves random unsplash Image when image is selected and in another
// component display the image as a cover image and use typescript

import { create } from "zustand";
type PreviewUnsplashImage = {
  selectedImage: string | "";
  setSelectedImage: (url: string) => void;
};
export const usePreviewUnsplashImage = create<PreviewUnsplashImage>((set) => ({
  selectedImage: "",
  setSelectedImage: (url: string) => set({ selectedImage: url }),
}));

// type UnsplashImageStore = {
//   selectedImage: string | null;
//   setSelectedImage: (url: string) => void;
// };

// export const useUnsplashImageStore = create<UnsplashImageStore>((set) => ({
//   selectedImage: null,
//   setSelectedImage: (url: string) => set({ selectedImage: url }),
// }));
// import { create } from 'zustand'

// type Store = {
//   count: number
//   inc: () => void
// }

// const useStore = create<Store>()((set) => ({
//   count: 1,
//   inc: () => set((state) => ({ count: state.count + 1 })),
// }))

// function Counter() {
//   const { count, inc } = useStore()
//   return (
//     <div>
//       <span>{count}</span>
//       <button onClick={inc}>one up</button>
//     </div>
//   )
// }
