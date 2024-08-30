import { useCardStore } from "@/lib/store/useCardStore";
import { usePreviewUnsplashImage } from "@/lib/store/useUnsplashImage";
import { cn } from "@/lib/utils";
import { ICard } from "@/types";
import { TBoardTaskCard } from "@/types/t";
import { useUpdateBoardTaskCard } from "@/utils/hooks/useBoards";
import { ImageOff, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TaskCardCoverImage() {
  const { selectedImage, setSelectedImage } = usePreviewUnsplashImage();

  const { card } = useCardStore();

  const [currentImage, setCurrentImage] = useState(card.coverImage);

  useEffect(() => {
    setCurrentImage(card.coverImage);
  }, [card.coverImage]);

  const { mutateAsync: updateBoardTaskCard, isPending } =
    useUpdateBoardTaskCard();

  const handleSaveImage = async () => {
    const payload = {
      cardId: card.cardId,
      coverImage: selectedImage,
    };
    const res = await updateBoardTaskCard(payload);
    if (res.success) {
      setSelectedImage("");
    }
  };

  if (selectedImage) {
    return (
      <TaskCardCoverImagePreview
        selectedImage={selectedImage}
        onSaveCallback={handleSaveImage}
        isSaving={isPending}
      />
    );
  }

  return (
    <>
      {currentImage ? (
        <img
          className="size-full rounded-lg object-cover"
          src={currentImage}
          height={200}
          width={1000}
          alt=""
        />
      ) : (
        <>
          <div className="grid size-full place-content-center rounded-lg border border-slate-300">
            <div className="flex flex-col items-center justify-center">
              <ImageOff className="size-20 text-gray-300" />
              <p className="text-xs text-gray-400">Cover Image Empty</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function TaskCardCoverImagePreview({
  selectedImage,
  isSaving,
  onSaveCallback,
}: {
  selectedImage: string;
  isSaving: boolean;
  onSaveCallback: () => void;
}) {
  // const { selectedImage, setSelectedImage } = usePreviewUnsplashImage();

  return (
    <div className="relative size-full">
      {selectedImage && (
        <img
          className="size-full rounded-lg object-cover"
          src={selectedImage}
          loading="lazy"
          alt=""
        />
      )}
      <div
        onClick={onSaveCallback}
        className={cn(
          "absolute bottom-0 right-0 z-10 w-[120px] cursor-pointer bg-black/60 py-2 text-center text-white hover:bg-black/90",
          isSaving && "bg-black/90",
        )}
      >
        {isSaving ? (
          <LoaderCircle className="mx-auto animate-spin" />
        ) : (
          <p>Save Image</p>
        )}
      </div>
    </div>
  );
}
