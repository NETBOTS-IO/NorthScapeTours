import { create } from "zustand";
import type { Tour } from "@/lib/data-utils";

interface TourStore {
  tour: Tour | null;
  setTour: (tour: Tour) => void;
}

export const useTourStore = create<TourStore>((set) => ({
  tour: null,
  setTour: (tour) => set({ tour }),
}));
