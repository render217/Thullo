import { ImageIcon, LoaderCircle, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { useGetUnsplashImage } from "@/utils/hooks/useUnsplash";
import { useActionSelector } from ".";
import { usePreviewUnsplashImage } from "@/lib/store/useUnsplashImage";
import { useUpdateBoardTaskCard } from "@/utils/hooks/useBoards";
import { TBoardTaskCard } from "@/types";
import { useCardStore } from "@/lib/store/useCardStore";

export default function CardCoverImageForm() {
  const { card } = useCardStore();
  const { openAction } = useActionSelector();
  const { setSelectedImage, selectedImage } = usePreviewUnsplashImage();

  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("random");

  const previousQueryRef = useRef(query);

  const {
    refetch,
    data: axiosResponse,
    isLoading,
    isFetching,
    isError,
    status,
  } = useGetUnsplashImage(searchTerm);

  const { mutateAsync: updateBoardTaskCard, isPending: isSaving } =
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
  const handleCancelImage = async () => {
    setSelectedImage("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (query !== previousQueryRef.current) {
      setSearchTerm(query);
      previousQueryRef.current = query; // Update the ref to the latest query
      refetch();
    }
  };

  const handleSelectImage = (url: string) => {
    setSelectedImage(url);
  };

  const imageResults =
    axiosResponse?.data?.results?.map((r: any) => ({
      full: r?.urls?.full,
      thumb: r?.urls?.thumb,
      small_s3: r?.urls?.small_s3,
      raw: r?.urls?.raw,
      regular: r?.urls?.regular,
    })) || [];

  return (
    <div>
      <DropdownMenu
        onOpenChange={(val) => {
          if (val) openAction("selectCover");
        }}
      >
        <DropdownMenuTrigger asChild className="w-full">
          <div className="flex w-full cursor-pointer items-center gap-2 rounded-md bg-slate-200 p-2 text-xs text-slate-500 shadow-sm hover:bg-slate-300">
            <ImageIcon className="size-4" />
            <p>Cover</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px] p-3">
          <div>
            <h3 className="text-sm font-semibold">Photo Search</h3>
            <p className="text-[10px]">Search Unsplash for photos</p>
          </div>
          {/* Search Input */}
          <div className="relative py-2">
            <Input
              className="h-6 py-0.5 pr-[28px] text-[10px] shadow-sm focus-visible:ring-0"
              placeholder="keywords..."
              value={query}
              disabled={isSaving}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <Button
              disabled={isFetching || isLoading}
              onClick={handleSearch}
              className="absolute right-1 top-2.5 h-5 w-fit p-1"
            >
              <Search className="size-3" />
            </Button>
          </div>
          {/* Display Results or Loading State */}
          {isLoading || isFetching ? (
            <div className="grid h-[140px] place-content-center">
              <LoaderCircle className="size-5 animate-spin" />
            </div>
          ) : (
            <div className="grid h-fit grid-cols-4 gap-x-1 gap-y-2">
              {!isLoading &&
                imageResults.length > 0 &&
                imageResults.map((img: any) => (
                  <div
                    key={img?.thumb}
                    className="h-11 w-11"
                    onClick={() => handleSelectImage(img?.small_s3)}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild className="cursor-pointer">
                          <img
                            className="size-full rounded-md object-cover"
                            src={img?.thumb}
                            alt=""
                            loading="lazy"
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectImage(img?.raw)}
                        >
                          <p className="text-xs">select image</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
            </div>
          )}
          {selectedImage && (
            <>
              <div className="mt-2 flex items-center gap-4">
                <Button
                  variant={"destructive"}
                  onClick={handleCancelImage}
                  className="h-6 w-[80px] text-center"
                >
                  <p className="text-[10px]">cancel</p>
                </Button>
                <Button
                  onClick={handleSaveImage}
                  className="h-6 w-[80px] text-center"
                >
                  {isSaving ? (
                    <LoaderCircle className="size-4 animate-spin text-white" />
                  ) : (
                    <p className="text-[10px]">save image</p>
                  )}
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
