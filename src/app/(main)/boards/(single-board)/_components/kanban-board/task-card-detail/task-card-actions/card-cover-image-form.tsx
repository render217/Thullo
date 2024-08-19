import { ImageIcon, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetUnsplashImage } from "@/utils/hooks/useUnsplash";
import { useActionSelector } from ".";
export default function CardCoverImageForm() {
  const { openAction } = useActionSelector();

  const [selectedImage, setSelectedImage] = useState("");
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("random");
  const {
    refetch,
    data: axiosResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetUnsplashImage(searchTerm);
  // console.log({ data: axiosResponse?.data, isLoading, isFetching, isError });
  const imageResults =
    axiosResponse?.data?.results?.map((r: any) => r?.urls?.full) || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSearchTerm("");
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    setSearchTerm(query);
    // refetch();
  };
  const handleSelectImage = (url: string) => {
    setSelectedImage(url);
  };
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
          {/* break to other component */}
          <div className="relative py-2">
            <Input
              className="h-6 py-0.5 pr-[28px] text-[10px] shadow-sm focus-visible:ring-0"
              placeholder="keywords..."
              value={query}
              onChange={handleInputChange}
            />
            <Button
              onClick={handleSearch}
              className="absolute right-1 top-2.5 h-5 w-fit p-1"
            >
              <Search className="size-3" />
            </Button>
          </div>
          {/* break to other component */}
          <div className="grid h-[140px] place-content-center">
            <p className="text-center text-[10px]">UI</p>
          </div>
          {/* {isLoading ||
            (isFetching && (
              <div className="grid h-[140px] place-content-center">
                <p className="text-center text-[10px]">Loading...</p>
              </div>
            ))} */}
          {/* <div className="grid h-fit grid-cols-4 gap-x-1 gap-y-2">
            {!isLoading &&
              !isFetching &&
              imageResults.length > 0 &&
              imageResults.map((url: any) => (
                <div
                  key={url}
                  className="h-11 w-11"
                  onClick={() => handleSelectImage(url)}
                >
                  <img
                    className="size-full rounded-md object-cover"
                    src={url}
                    alt=""
                  />
                </div>
              ))}
          </div> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
