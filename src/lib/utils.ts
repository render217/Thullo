import { ErrorResponse } from "@/types/axios.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import { parse } from "path";
import { LABEL_COLORS_OPTION } from "./constants";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, maxLength: number): string {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

export const handleError = (error: unknown): ErrorResponse => {
  console.error(error);
  const err = typeof error === "string" ? error : JSON.stringify(error);
  return {
    success: false,
    data: err || "Something went wrong",
  };
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function checkImageUrl(
  url: string,
  defaultUrl: string,
): Promise<string> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (
      response.ok &&
      response.headers.get("content-type")?.includes("image")
    ) {
      return url;
    } else {
      return defaultUrl;
    }
  } catch (error) {
    return defaultUrl;
  }
}

export function formatDate(date: unknown) {
  if (typeof date === "string") {
    // Parse the ISO string to a Date object
    const dateString = parseISO(date);
    return format(dateString, "dd MMMM yyyy 'at' HH:mm");
  }

  if (date instanceof Date) {
    return format(date, "dd MMMM yyyy 'at' HH:mm");
  }
  return "-- -- --";
}

export const getTailwindColor = (color: string) => {
  const colorObj = LABEL_COLORS_OPTION.find((c) => c.color === color);
  return colorObj ? colorObj.tailwindColor : null;
};
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);
