import { create } from "zustand";
import { FILTER_OPTIONS, FilterOptions } from "../constants";

type FilterState = {
  filter: FilterOptions;
  setFilter: (filter: FilterOptions) => void;
};

export const useBoardsFilter = create<FilterState>((set) => ({
  filter: FILTER_OPTIONS.ALL, // default filter
  setFilter: (filter) => set({ filter }),
}));
