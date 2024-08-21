import { ErrorResponse } from "@/types/axios.types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
